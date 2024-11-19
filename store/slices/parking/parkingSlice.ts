import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IParkingSliceState, IParkingSquareRange, ParkingSpaceType } from './parkingSliceTypes';
import { fetchParking } from '../../api/api';
import { AppDispatch, RootState } from '../../reduxStore';

const initialState: IParkingSliceState = {
    assetsType: 'parking',
    choiceType: 'scheme',
    spaceType: 'all',
    parkingMinPriceLimit: 4000000,
    parkingMaxPriceLimit: 10000000,
    parkingMinPrice: 5000000,
    parkingMaxPrice: 8000000,
    parkingLevel: 'm1level',
    pantryMinPriceLimit: 5000000,
    pantryMaxPriceLimit: 150000000,
    pantryMinPrice: 5000000,
    pantryMaxPrice: 150000000,
    pantryLevel: 'all',
    houseType: 'all',
    minSquare: 50,
    maxSquare: 100,
    parkingData: [],
    pantryData: [],
    isResetedFlag: false,
};

const parkingSlice = createSlice({
    name: 'parking',
    initialState,
    reducers: {
        setAssetsType(state, action) {
            state.assetsType = action.payload;
        },
        setChoiceType(state, action) {
            state.choiceType = action.payload;
            if (state.assetsType === 'parking') {
                if (state.choiceType === 'scheme' && state.parkingLevel === 'all') {
                    state.parkingLevel = 'm1level';
                }
            }
        },
        setSpaceType(state, action) {
            state.spaceType = action.payload;
        },
        setParkingPriceRange(state, action: PayloadAction<number[]>) {
            const [minPrice, maxPrice] = action.payload;
            if (minPrice < maxPrice) {
                state.parkingMinPrice = minPrice;
                state.parkingMaxPrice = maxPrice;
            }
        },
        setParkingLevel(state, action) {
            state.parkingLevel = action.payload;
        },
        setPantryLevel(state, action) {
            state.pantryLevel = action.payload;
        },
        setLevel(state, action) {
            if (state.assetsType === 'parking') state.parkingLevel = action.payload;
            else state.pantryLevel = action.payload;
        },
        setHouse(state, action) {
            state.houseType = action.payload;
        },
        setSquareRange(state, action: PayloadAction<IParkingSquareRange>) {
            const { minSquare, maxSquare } = action.payload;
            if (minSquare < maxSquare) {
                state.minSquare = minSquare;
                state.maxSquare = maxSquare;
            }
        },
        //Для текущего значения assetsType
        resetFilter(state) {
            if (state.assetsType === 'parking') {
                let { spaceType, parkingMinPrice, parkingMaxPrice, parkingLevel } = initialState;
                if (state.choiceType === 'list') parkingLevel = 'all';
                Object.assign(state, { spaceType, parkingMinPrice, parkingMaxPrice, parkingLevel });
                state.isResetedFlag = true;
            }
        },
        setIsResetedFlag(state) {
            state.isResetedFlag = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchParking.pending, (state) => {
                //                state.urls.getResidential.status = 'pending';
                //                state.urls.getResidential.error = null;
            })
            .addCase(fetchParking.fulfilled, (state, action) => {
                const loadedData = (state.parkingData = action.payload.flats.map((flat) => {
                    const { id, number, floor, price, status, attributesData, name, area } = flat;
                    return { id, number, floor, price, status, name, area, spaceType: getSpaceTypeFromAttributesData(attributesData) };
                }));
                const parkingData = loadedData.filter((item) => item.status === 'free');
                state.parkingData = parkingData;
                const limits = [action.payload.price.min, action.payload.price.max];
                [state.parkingMinPriceLimit, state.parkingMaxPriceLimit] = limits;
                [state.parkingMinPrice, state.parkingMaxPrice] = limits;
            })
            .addCase(fetchParking.rejected, (state, action) => {
                console.log('Ошибка при запросе на сервер - parking', action.payload);
                //state.urls.getResidential.error = 'error';
                //state.urls.getResidential.status = 'rejected';
            });
    },
});

function getSpaceTypeFromAttributesData(attributesData: any): ParkingSpaceType | undefined {
    let type: ParkingSpaceType | undefined = undefined;
    const formaParking = attributesData.formaParking;
    if (formaParking) {
        if (formaParking.semejnoeSUvelichennymiGabaritami?.value) type = 'family enlarged';
        else if (formaParking.semejnoe?.value) type = 'family';
        else if (formaParking.sUvelichennymiGabaritami?.value) type = 'enlarged';
        else if (formaParking.standartnoe?.value) type = 'standard';
    }
    return type;
}

export const {
    setAssetsType,
    setSpaceType,
    setChoiceType,
    setParkingPriceRange,
    setParkingLevel,
    setPantryLevel,
    setLevel,
    setHouse,
    resetFilter,
    setIsResetedFlag,
} = parkingSlice.actions;

export default parkingSlice.reducer;

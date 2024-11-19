import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../reduxStore';

export const getParkingPriceLimits = createSelector(
    [(state: RootState) => state.parking.parkingMinPriceLimit, (state: RootState) => state.parking.parkingMaxPriceLimit],
    (min, max) => [min, max],
);

export const getParkingPriceRange = createSelector(
    [(state: RootState) => state.parking.parkingMinPrice, (state: RootState) => state.parking.parkingMaxPrice],
    (min, max) => [min, max],
);

export const getPantryPriceRange = createSelector(
    [(state: RootState) => state.parking.pantryMinPrice, (state: RootState) => state.parking.pantryMaxPrice],
    (min, max) => [min, max],
);

export const getLevel = createSelector(
    [
        (state: RootState) => state.parking.assetsType,
        (state: RootState) => state.parking.parkingLevel,
        (state: RootState) => state.parking.pantryLevel,
    ],
    (assetsType, parkingLevel, pantryLevel) => (assetsType === 'parking' ? parkingLevel : pantryLevel),
);

export const getParkingFiltered = createSelector(
    [(state: RootState) => state.parking.parkingData, (state: RootState) => state.parking.spaceType, getParkingPriceRange, getLevel],
    (parkingData, spaceType, priceRange, level) => {
        return parkingData.filter(
            (item) =>
                (spaceType === 'all' || item.spaceType === spaceType) &&
                item.price >= priceRange[0] &&
                item.price <= priceRange[1] &&
                (level === 'all' || (level === 'm1level' && item.floor === -1) || (level === 'm2level' && item.floor === -2)),
        );
    },
);

export const getPantryFiltered = createSelector(
    [
        (state: RootState) => state.parking.pantryData,
        (state: RootState) => state.parking.houseType,
        getPantryPriceRange,
        (state: RootState) => state.parking.pantryLevel,
    ],
    (pantryData, houseType, priceRange, pantryLevel) => {
        return pantryData.filter((item) => houseType === 'all' || item.houseType === houseType);
    },
);

export const getDataFiltered = createSelector(
    [(state: RootState) => state.parking.assetsType, getParkingFiltered, getPantryFiltered],
    (assetsType, parkingFiltered, pantryFiltered) => {
        if (assetsType === 'parking') return parkingFiltered;
        else return pantryFiltered;
    },
);

export const getParkingFilteredCount = createSelector([getParkingFiltered], (filtered) => filtered.length);

export const getFilteredCount = createSelector([getDataFiltered], (filtered) => filtered.length);

export const getFilterChanged = createSelector(
    [
        (state: RootState) => state.parking.parkingLevel,
        (state: RootState) => state.parking.assetsType,
        (state: RootState) => state.parking.spaceType,
        getParkingPriceLimits,
        getParkingPriceRange,
    ],

    (parkingLevel, assetsType, spaceType, parkingPriceLimits, parkingPriceRange) => {
        if (assetsType === 'parking') {
            let result = parkingLevel === 'all' ? 0 : 1;
            if (spaceType !== 'all') result++;
            if (parkingPriceRange[0] > parkingPriceLimits[0] || parkingPriceRange[1] < parkingPriceLimits[1]) result++;
            return result;
        }
        return undefined; // TODO
    },
);

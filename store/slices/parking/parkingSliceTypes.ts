import { IApiParkingFlats } from '../../api/apiTypes';

export type ParkingAssetsType = 'parking' | 'pantry';
export type ParkingChoiceType = 'scheme' | 'list';

export const parkingSpaceTypes = ['all', 'standard', 'enlarged', 'family', 'family enlarged'] as const;
export type ParkingSpaceType = (typeof parkingSpaceTypes)[number];

export type ParkingLevelType = 'all' | 'm1level' | 'm2level';
export type ParkingHouseType = 'all' | 'type-1' | 'type-2' | 'type-3';

export type ParkingCategories = {
    [key in ParkingSpaceType]?: string;
};

export interface IParkingSquareRange {
    minSquare: number;
    maxSquare: number;
}

export interface IParkingSliceState {
    assetsType: ParkingAssetsType;
    choiceType: ParkingChoiceType;
    spaceType: ParkingSpaceType;
    parkingMinPriceLimit: number;
    parkingMaxPriceLimit: number;
    parkingMinPrice: number;
    parkingMaxPrice: number;
    parkingLevel: ParkingLevelType;
    pantryMinPriceLimit: number;
    pantryMaxPriceLimit: number;
    pantryMinPrice: number;
    pantryMaxPrice: number;
    pantryLevel: ParkingLevelType;
    houseType: ParkingHouseType;
    minSquare: number;
    maxSquare: number;
    parkingData: IApiParkingFlats[];
    pantryData: any[];
    isResetedFlag: boolean;
}

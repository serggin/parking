import { ParkingSpaceType } from '../slices/parking/parkingSliceTypes';

/**
*
**/


export interface IApiParking {
    flats: IApiParkingFlats[];
    price: {
        max: number;
        min: number;
    };
}

export interface IApiParkingFlats {
    id: number;
    number: string;
    floor: number;
    price: number;
    area: number;
    status: string;
    spaceType: ParkingSpaceType | undefined;
    name: string;
    attributesData?: {
        formaParking: IApiParking;
    };
}


import { IApiParkingFlats } from '../store/api/apiTypes';
import { ParkingCategories } from '../store/slices/parking/parkingSliceTypes';

export const getFractionalNum = (place: IApiParkingFlats, separator = '/') => {
    // Получаем место через дробь, например, 165/166
    if (place.name.split(', ').length > 1) {
        return `${place.number}${separator}${+place.number + 1}`;
    } else {
        return place.number;
    }
};

export const getPureParkingPlaceId = (id: string) => {
    const match = id.match(/\d+/);
    if (match) return match[0];
    return '';
};

export const parkingCategories: ParkingCategories = {
    standard: 'стандартное',
    enlarged: 'увеличенное',
    family: 'семейное',
    'family enlarged': 'семейное увеличенное',
};

import { useAppDispatch } from '../hook';
import { setSpaceType } from '../../../../store/slices/parking/parkingSlice';
import ButtonSet, { ButtonOfSet } from '../buttonSet/ButtonSet';
import { ParkingSpaceType } from '../../../store/slices/parking/parkingSliceTypes';
import { useAppSelector } from '../hook';

export const parkingSpaceButtons: ButtonOfSet<ParkingSpaceType>[] = [
    {
        type: 'all',
        title: 'все',
    },
    {
        type: 'standard',
        title: 'стандартное',
    },
    {
        type: 'enlarged',
        title: 'увеличенное',
    },
    {
        type: 'family',
        title: 'семейное',
    },
    {
        type: 'family enlarged',
        title: 'семейное увеличенное',
    },
];

export default function CategoryChoice() {
    const dispatch = useAppDispatch();
    const activeButton: ParkingSpaceType = useAppSelector((state) => state.parking.spaceType);

    const onClick = (type: ParkingSpaceType) => {
        dispatch(setSpaceType(type));
    };

    return <ButtonSet buttons={parkingSpaceButtons} nameOfSet='Категория' onClick={onClick} activeButton={activeButton} />;
}

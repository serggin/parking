import { useAppDispatch, useAppSelector } from '../hook';
import { getLevel } from '../../../store/slices/parking/parkingSelectors';
import { setLevel } from '../../../store/slices/parking/parkingSlice';
import { ParkingLevelType } from '../../../store/slices/parking/parkingSliceTypes';
import ButtonSet, { ButtonOfSet } from '../buttonSet/ButtonSet';

//Используем, что для Кладовых тоже самое
const allButtons: ButtonOfSet<ParkingLevelType>[] = [
    {
        type: 'all',
        title: 'все',
    },
    {
        type: 'm1level',
        title: '-1 этаж',
    },
    {
        type: 'm2level',
        title: '-2 этаж',
    },
];

export default function LevelChoice() {
    const dispatch = useAppDispatch();

    const level = useAppSelector(getLevel);
    const choiceType = useAppSelector((state) => state.parking.choiceType);

    let buttons: ButtonOfSet<ParkingLevelType>[];
    if (choiceType === 'scheme') {
        //Если отображается схема, то Опция "all" должна отсутствовать
        if (level === 'all') dispatch(setLevel('m1level'));
        buttons = allButtons.filter((button) => button.type !== 'all');
    } else buttons = allButtons;

    const activeButton = level;

    const onClick = (type: ParkingLevelType) => {
        dispatch(setLevel(type));
    };

    return <ButtonSet buttons={buttons} nameOfSet='Этаж' onClick={onClick} activeButton={activeButton} />;
}

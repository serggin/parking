import { useAppSelector } from '../hook';
import ButtonSet, { ButtonOfSet } from '../buttonSet/ButtonSet';

export type HouseType = 'all' | 'type-1' | 'type-2' | 'type-3';

const buttons: ButtonOfSet<HouseType>[] = [
    {
        type: 'all',
        title: 'все',
    },
    {
        type: 'type-1',
        title: 'type-1',
    },
    {
        type: 'type-2',
        title: 'type-2',
    },
    {
        type: 'type-3',
        title: 'type-3',
    },
];

export default function HouseFilter() {
    const houseType = useAppSelector((state) => state.parking.houseType);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onClick = (type: HouseType) => {};

    return <ButtonSet buttons={buttons} nameOfSet='Дом' onClick={onClick} activeButton={houseType} />;
}

import BlockWrapper from '../BlockWrapper';
import ParkingRangeSlider from '../rangeSlider/ParkingRangeSlider';

export default function PantrySquareFilter() {
    const start: [number, number] = [50, 80];
    const range: [number, number] = [0, 100];

    return (
        <div>
            <BlockWrapper label={'Площадь'}>
                <ParkingRangeSlider start={start} range={range} units={'м2'} />
            </BlockWrapper>
        </div>
    );
}

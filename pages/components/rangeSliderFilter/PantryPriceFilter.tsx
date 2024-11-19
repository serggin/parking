import BlockWrapper from '../BlockWrapper';
import ParkingRangeSlider from '../rangeSlider/ParkingRangeSlider';

export default function PantryPriceFilter() {
    const start: [number, number] = [7000000, 150000000];
    const range: [number, number] = [1000000, 200000000];

    return (
        <div>
            <BlockWrapper label={'Цена'}>
                <ParkingRangeSlider start={start} range={range} units={'₽'} />
            </BlockWrapper>
        </div>
    );
}

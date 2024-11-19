import BlockWrapper from '../BlockWrapper';
import ParkingRangeSlider from '../rangeSlider/ParkingRangeSlider';
import { useAppSelector } from '../hook';
import { getParkingPriceLimits, getParkingPriceRange } from '../../../store/slices/parking/parkingSelectors';

export default function ParkingPriceFilter() {
    const range = useAppSelector(getParkingPriceLimits);
    const start = useAppSelector(getParkingPriceRange);

    return (
        <BlockWrapper label={'Цена'}>
            <ParkingRangeSlider start={start} range={range} units={'₽'} />
        </BlockWrapper>
    );
}

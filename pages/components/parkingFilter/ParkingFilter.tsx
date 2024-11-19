import CategoryFilter from '../categoryFilter/CategoryFilter';
import LevelFilter from '../levelFilter/LevelFilter';
import ParkingPriceFilter from '../rangeSliderFilter/ParkingPriceFilter';
import styles from './ParkingFilter.module.scss';

export default function ParkingFilter() {
    return (
        <div className={styles.parkingFilter}>
            <CategoryFilter />
            <ParkingPriceFilter />
            <LevelFilter />
        </div>
    );
}

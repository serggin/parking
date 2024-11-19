import HouseFilter from '../houseFilter/HouseFilter';
import PantryPriceFilter from '../rangeSliderFilter/PantryPriceFilter';
import PantrySquareFilter from '../rangeSliderFilter/PantrySquareFilter';
import LevelFilter from '../levelFilter/LevelFilter';
import styles from './PantryFilter.module.scss';

export default function PantryFilter() {
    return (
        <div className={styles.pantryFilter}>
            <HouseFilter />
            <PantrySquareFilter />
            <PantryPriceFilter />
            <LevelFilter />
        </div>
    );
}

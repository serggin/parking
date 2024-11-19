import { useAppSelector } from '../hook';
import { getFilterChanged } from '../../../store/slices/parking/parkingSelectors';
import SvgIcons from '../svgs/SvgIcons';
import styles from './AssetsFilter.module.scss';

export default function MobileFilterButton({ openModal }: { openModal: () => void }) {
    const filterChanged = useAppSelector(getFilterChanged);
    const theme = filterChanged ? 'light' : 'brick';
    const className = `${styles.mobileFilterButton} ${filterChanged ? styles.filterChanged : ''}`;
    return (
        <button className={className} onClick={openModal}>
            <SvgIcons id={'mobile-filter'} theme={theme} />
            {filterChanged ? (
                <div>
                    <span>{filterChanged}</span>
                </div>
            ) : null}
        </button>
    );
}

import { useAppDispatch } from '../hook';
import { IApiParkingFlats } from '../../../store/api/apiTypes';
import { openModal } from '../openModal';
import formatLongPrice from '../format-long-price';
import SimpleButton from '../SimpleButton';
import { getFractionalNum, parkingCategories } from '../../utils';

import styles from '../schemeChoice/Scheme.module.scss';

const TooltipParking = (props: IApiParkingFlats) => {
    const { spaceType, price } = props;
    const dispatch = useAppDispatch();

    const showModal = () => {
        dispatch(openModal('parkingForm'));
    };

    return (
        <div className={styles.tooltipParking}>
            <div className={styles.tooltipParking__top}>
                <p className={styles.tooltipParking__number}>{getFractionalNum(props)}</p>
            </div>
            <div className={styles.tooltipParking__content}>
                <div className={styles.tooltipParking__category}>
                    <p className={styles.tooltipParking__subtitle}>Категория</p>
                    <p className={styles.tooltipParking__value}>{spaceType && parkingCategories[spaceType]}</p>
                </div>
                <div className={styles.tooltipParking__price}>
                    <p className={styles.tooltipParking__subtitle}>Цена</p>
                    <p className={styles.tooltipParking__value}>{formatLongPrice(price)}&nbsp;₽</p>
                </div>
            </div>
            <div className={styles.tooltipParking__btn}>
                <SimpleButton func={showModal} text='Оставить заявку' type='button' size='mini' color='light' outline />
            </div>
        </div>
    );
};

export default TooltipParking;

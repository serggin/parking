import Nouislider from 'nouislider-react';

import styles from './ParkingRangeSlider.module.scss';
import formatLongPrice from '../format-long-price';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hook';
import { setParkingPriceRange, setIsResetedFlag } from '../../../store/slices/parking/parkingSlice';

interface IProps {
    start: number[];
    range: number[];
    units?: string;
}

export default function ParkingRangeSlider({ start, range, units }: IProps) {
    const { isResetedFlag } = useAppSelector((state) => state.parking);
    const [sliderValues, setSliderValues] = useState(start);
    if (sliderValues[0] !== start[0] || sliderValues[1] !== start[1]) setSliderValues(start);

    const dispatch = useAppDispatch();

    //Получение новых значений слайдера и запуск фильтрации
    const onSlideSlider = (/*slider: slidersType,*/ values: number[]) => {
        setSliderValues(values);
        //Обновляем значения конкретного range-слайдера
        //dispatch(updateInputValues({ slider, values }));
    };

    const onChangeSlider = (/*slider: slidersType,*/ values: number[]) => {
        dispatch(setParkingPriceRange(values));
        dispatch(setIsResetedFlag());
        //Запускаем фильтрацию по всем слайдерам
        //dispatch(updateSliderValues({ slider, values }));
        //Сортируем получившиеся данные с учетом текущих параметров таблицы
        //dispatch(sortFlats({ value: sortParameters.value, placeCall: inForm, array: 'shownFlats' }));
    };

    useEffect(() => {
        if (isResetedFlag) onChangeSlider(range);
    }, [isResetedFlag]);

    return (
        <>
            <div className={styles.slider}>
                <div className={styles.block}>
                    <span className={styles.label}>ОТ</span>
                    <div className={styles.input}>
                        <span>{formatLongPrice(sliderValues[0])}</span>
                        {units === 'м2' ? (
                            <span>
                                {' '}
                                м<sup className={styles.sup}>2</sup>
                            </span>
                        ) : (
                            <span> {units}</span>
                        )}
                    </div>
                </div>
                <div className={styles.block}>
                    <span className={styles.label}>ДО</span>
                    <div className={styles.input}>
                        <span>{formatLongPrice(sliderValues[1])}</span>
                        {units === 'м2' ? (
                            <span>
                                {' '}
                                м<sup className={styles.sup}>2</sup>
                            </span>
                        ) : (
                            <span> {units}</span>
                        )}
                    </div>
                </div>
            </div>
            <div className={styles.range__container}>
                <Nouislider
                    connect={true}
                    range={{ min: range[0], max: range[1] }}
                    step={1}
                    start={[sliderValues[0], sliderValues[1]]}
                    onSlide={(values) => onSlideSlider(/*slider,*/ values)}
                    onChange={(values) => onChangeSlider(/*slider,*/ values)}
                    disabled={false}
                />
            </div>
        </>
    );
}

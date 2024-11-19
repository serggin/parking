import { IColumn, ISortColumn } from './ListChoice';
import styles from './ListChoice.module.scss';
import { useAppDispatch, useAppSelector } from '../hook';
import { getDataFiltered } from '../../../store/slices/parking/parkingSelectors';
import formatLongPrice from '../format-long-price';
import { parkingSpaceButtons } from '../categoryFilter/CategoryFilter';
import sortNumber from '../sort-number';
import { openModal } from '../openModal';
import SimpleButton from '../SimpleButton';
import SvgIcons from '../svgs/SvgIcons';
import { getFractionalNum } from '../../utils';
import { useState } from 'react';
import { IApiParkingFlats } from '../../../store/api/apiTypes';

export function formatSpaceType(spaceType: string) {
    return parkingSpaceButtons.find((button) => button.type === spaceType)?.title || '';
}

interface ITableBody {
    columns: IColumn;
    sortColumn: ISortColumn;
    rowStyle: string;
    setSortColumn: (sortColumn: ISortColumn) => void;
}

interface ISortingOption {
    label: string;
    sortColumn: string;
    direction: 'asc_' | 'desc_';
}

export default function TableBody({ columns, sortColumn, rowStyle, setSortColumn }: ITableBody) {
    const [showDropdown, setShowDropdown] = useState(false);
    const dispatch = useAppDispatch();
    const filteredData = useAppSelector(getDataFiltered);
    const widthTablet = useAppSelector((state) => state.main.breakpoint.tablet);
    const width = useAppSelector((state) => state.main.width);
    const isAdaptive = width <= widthTablet;

    const sortingOptions: ISortingOption[] = [
        { label: 'По возрастанию цены', sortColumn: 'price', direction: 'asc_' },
        { label: 'По убыванию цены', sortColumn: 'price', direction: 'desc_' },
        { label: 'По возрастанию площади', sortColumn: 'spaceType', direction: 'asc_' },
        { label: 'По убыванию площади', sortColumn: 'spaceType', direction: 'desc_' },
    ];

    let sortedData: Record<string, string>[];
    const sortDirection = sortColumn?.asc ? 'asc_' : 'desc_';
    switch (sortColumn.name) {
        case 'number':
        case 'floor':
        case 'price':
            sortedData = sortNumber(filteredData, sortColumn.name, sortDirection).map((i: IApiParkingFlats) => ({
                ...i,
                number: getFractionalNum(i),
            }));
            break;
        case 'spaceType':
            sortedData = sortNumber(filteredData, 'area', sortDirection);
            break;
        default:
            sortedData = filteredData;
    }

    const handleClick = () => {
        dispatch(openModal('parkingForm'));
    };

    const formatSpaceType = (spaceType: string) => {
        return parkingSpaceButtons.find((button) => button.type === spaceType)?.title || '';
    };

    const formatCellData = (name: string, value: string) => {
        if (name === 'price') return formatLongPrice(value) + ' ₽';
        if (name === 'spaceType') return formatSpaceType(value);
        else return value;
    };

    const customCellClassName = (name: string) => {
        if (name === 'price') return styles.cellPrice;
        if (name === 'button') return styles.cellButton;
        return '';
    };

    const handleSortSelection = (option: ISortingOption) => {
        const { sortColumn, direction } = option;
        setSortColumn({ name: sortColumn, asc: direction === 'asc_' });
        setShowDropdown(false);
    };

    const getSortButtonText = () => {
        const currentSortOption = sortingOptions.find(
            (option) => option.sortColumn === sortColumn.name && (option.direction === 'asc_' ? sortColumn.asc : !sortColumn.asc),
        );
        return currentSortOption ? currentSortOption.label : 'по возрастанию цены';
    };
    const iconSortButton = `arrow ${showDropdown ? 'up' : 'down'} dark small`;

    return (
        <>
            {!filteredData.length && !isAdaptive && (
                <p className={styles.emptyData}>
                    По&nbsp;заданным параметрам ничего не&nbsp;найдено. Пожалуйста, измените критерии поиска или позвоните нам.
                    Мы&nbsp;будем рады помочь с&nbsp;выбором.
                </p>
            )}

            {filteredData.length > 0 &&
                !isAdaptive &&
                sortedData.map((rowData) => (
                    <div className={`${styles.grid} ${styles.bodyRow} ${rowStyle}`} key={rowData.id}>
                        {Object.entries(columns).map(([name]) => {
                            const className = `${styles.cell} ${customCellClassName(name)}`;
                            return (
                                <div className={className} key={name}>
                                    {name === 'button' ? (
                                        <SimpleButton
                                            outline
                                            func={() => handleClick()}
                                            type='button'
                                            color='dark-grey'
                                            size='mini'
                                            text='оставить заявку'
                                        />
                                    ) : (
                                        formatCellData(name, rowData[name])
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}

            {isAdaptive && (
                <div className={styles.adaptiveContent}>
                    <div className={styles.adaptiveContent__sortBtn}>
                        <SimpleButton
                            func={() => setShowDropdown(!showDropdown)}
                            outline
                            iconPosition='right'
                            color='brick-light'
                            text={getSortButtonText()}
                            size='mini'
                            type='button'
                        >
                            <SvgIcons id={iconSortButton} theme='brick-light' />
                        </SimpleButton>
                        {showDropdown && (
                            <div className={styles.adaptiveContent__sortBtn_dropdown}>
                                {sortingOptions.map((option) => (
                                    <div key={option.label} onClick={() => handleSortSelection(option)}>
                                        {option.label}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className={styles.listAdaptive}>
                        {!filteredData.length ? (
                            <p className={styles.emptyData}>
                                По&nbsp;заданным параметрам ничего не&nbsp;найдено. Пожалуйста, измените критерии поиска или позвоните нам.
                                Мы&nbsp;будем рады помочь с&nbsp;выбором.
                            </p>
                        ) : (
                            sortedData.map((i) => (
                                <div key={i.number} className={styles.listAdaptive__item}>
                                    <div>
                                        <div className={styles.listAdaptive__item_price}>
                                            <p>
                                                {i.number}
                                                <span>{formatSpaceType(i.spaceType)}</span>
                                            </p>
                                            <p>{formatLongPrice(i.price)}&nbsp;₽</p>
                                        </div>
                                        <div className={styles.listAdaptive__item_floor}>
                                            {i.floor}
                                            <span>этаж</span>
                                        </div>
                                    </div>
                                    <div>
                                        <SimpleButton
                                            outline
                                            func={() => handleClick()}
                                            type='button'
                                            color='dark-grey'
                                            size='mini'
                                            text='оставить заявку'
                                        />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

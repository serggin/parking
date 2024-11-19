import styles from './ListChoice.module.scss';
import TableHeader from './TableHeader';
import { useAppSelector } from '../hook';
import TableBody from './TableBody';
import { useState } from 'react';

export type IColumn = {
    [key: string]: {
        title: string;
        valueClassName?: string;
    };
};
type IColumns = {
    [key: string]: IColumn;
};

const listColumns: IColumns = {
    parking: {
        number: { title: '№ места' },
        spaceType: { title: 'Категория' },
        floor: { title: 'Этаж' },
        price: { title: 'Цена' },
        button: { title: '' },
    },
    pantry: {},
};

export interface ISortColumn {
    name: string;
    asc: boolean;
}

const sortColumns: { [key: string]: ISortColumn } = {
    parking: {
        name: 'price',
        asc: true,
    },
};

export default function ListChoice() {
    const [sortColumn, setSortColumn] = useState<ISortColumn>({ name: '', asc: true });
    const assetsType = useAppSelector((state) => state.parking.assetsType);

    let columns: IColumn;
    let rowStyle = '';
    if (assetsType === 'parking') {
        columns = listColumns.parking;
        if (!sortColumn.name) setSortColumn(sortColumns.parking);
        rowStyle = styles.parkingRow;
    } else {
        columns = {};
    }

    return (
        <div className={styles.listChoice}>
            <div className={styles.content}>
                <TableHeader columns={columns} sortColumn={sortColumn} setSortColumn={setSortColumn} rowStyle={rowStyle} />
                <TableBody columns={columns} sortColumn={sortColumn} setSortColumn={setSortColumn} rowStyle={rowStyle} />
            </div>
        </div>
    );
}

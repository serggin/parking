import SvgIcons from '../svgs/SvgIcons';
import { IColumn, ISortColumn } from './ListChoice';
import styles from './ListChoice.module.scss';

interface ITableHeader {
    columns: IColumn;
    sortColumn: ISortColumn;
    setSortColumn: (sortColumn: ISortColumn) => void;
    rowStyle: string;
}

export default function TableHeader({ columns, sortColumn, setSortColumn, rowStyle }: ITableHeader) {
    const descClassName = sortColumn.asc ? '' : styles.desc;
    function sorting(key: string) {
        if (key === sortColumn.name) setSortColumn({ ...sortColumn, asc: !sortColumn.asc });
        else setSortColumn({ name: key, asc: true });
    }

    return (
        <div className={`${styles.grid} ${styles.headerRow} ${rowStyle}`}>
            {Object.entries(columns).map(([key, column]) => (
                <div className={`${styles.cell} ${descClassName}`} key={key} onClick={() => sorting(key)}>
                    <span>{column.title}</span>
                    {/*Показать стрелочку*/}
                    {sortColumn?.name === key && <SvgIcons id={'arrow down dark small'} />}
                </div>
            ))}
        </div>
    );
}

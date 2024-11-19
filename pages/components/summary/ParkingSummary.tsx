import SvgIcons from '../svgs/SvgIcons';
import styles from './ParkingSummary.module.scss';

interface ISummaryData {
    svg: string;
    text: string;
    center?: boolean;
}

const summaryData: ISummaryData[] = [
    { svg: 'parking', text: 'Обогреваемая рампа с&nbsp;тепловыми завесами на&nbsp;въезде и&nbsp;выезде с&nbsp;паркинга' },
    { svg: 'parking1', text: 'Стандартные и&nbsp;семейные машиноместа площадью от&nbsp;13,25&nbsp;м&sup2;' },
    { svg: 'parking2', text: 'Увеличенные машиноместа площадью от&nbsp;13,78&nbsp;м&sup2; до&nbsp;16,8&nbsp;м&sup2;' },
    { svg: 'parking3', text: 'Система распознавания номеров, а&nbsp;также система въезда/выезда по&nbsp;меткам' },
    { svg: 'parking4', text: 'Система экстренной связи с&nbsp;постом охраны' },
    { svg: 'parking5', text: 'Высота паркинга на&nbsp;въезде 4,2&nbsp;м', center: true },
    {
        svg: 'parking6',
        text: 'Предусмотрен проезд на&nbsp;паркинг грузовых автомобилей к&nbsp;лестнично-лифтовому узлу каждой башни для загрузки/разгрузки',
    },
    { svg: 'parking7', text: 'Усиление сотовой связи', center: true },
    { svg: 'parking8', text: 'Индивидуальные кладовые площадью от&nbsp;2,88&nbsp;м&sup2; до&nbsp;12,34&nbsp;м&sup2;' },
    { svg: 'parking9', text: 'Общее количество машиномест для башен REDS и&nbsp;PLATINUM&nbsp;&mdash; 388' },
];

function SummaryLine({ svg, text, center }: ISummaryData) {
    const textClassName = `${styles.text} ${center ? styles.centerText : ''}`;
    return (
        <div className={styles.summaryLine}>
            <span className={styles.svg}>
                <SvgIcons id={svg} theme='light' />
            </span>
            <div className={textClassName} dangerouslySetInnerHTML={{ __html: text }}></div>
        </div>
    );
}
export default function ParkingSummary() {
    return (
        <div className={styles.parkingSummary}>
            <div className={styles.summaryTitle}>общие характеристики паркинга и кладовыx</div>
            {summaryData.map((summaryLine, index) => (
                <SummaryLine key={index} {...summaryLine} />
            ))}
        </div>
    );
}

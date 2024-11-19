import { useCallback, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hook';
import styles from './AssetsChoice.module.scss';
import { ITabButton } from '../parkingTypes';
import { getFilteredCount } from '../../../store/slices/parking/parkingSelectors';
import Scheme from '../schemeChoice/Scheme';
import ListChoice from '../listChoice/ListChoice';
import { setChoiceType } from '../../../store/slices/parking/parkingSlice';

function TabButton({ title, isActive, onClick }: ITabButton) {
    const className = `${styles.tabButton} ${isActive ? styles.active : ''}`;
    return (
        <span className={className} onClick={() => onClick()}>
            {title}
        </span>
    );
}

export default function AssetsChoice() {
    const dispatch = useAppDispatch();

    const chooseTab = useCallback((isParkingTab: boolean) => {
        setIsSchemeActive(isParkingTab);
        dispatch(setChoiceType(isParkingTab ? 'scheme' : 'list'));
    }, []);

    const tabButtons: ITabButton[] = useMemo(
        () => [
            {
                title: 'на схеме',
                onClick: () => chooseTab(true),
            },
            {
                title: 'списком',
                onClick: () => chooseTab(false),
            },
        ],
        [chooseTab],
    );

    const [isSchemeActive, setIsSchemeActive] = useState(true);
    const found = useAppSelector(getFilteredCount);

    return (
        <div className={styles.assetsChoice}>
            <div className={styles.assetsTabs}>
                <span className={styles.found}>{`Найдено: ${found}`}</span>
                <div className={styles.tabButtons}>
                    {tabButtons.map((tabButton, index) => (
                        <TabButton
                            key={tabButton.title}
                            title={tabButton.title}
                            isActive={(index === 0 && isSchemeActive) || (index === 1 && !isSchemeActive)}
                            onClick={tabButton.onClick}
                        />
                    ))}
                </div>
            </div>
            {isSchemeActive ? <Scheme /> : <ListChoice />}
        </div>
    );
}

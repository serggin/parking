import { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './AssetsFilter.module.scss';
import ParkingFilter from '../parkingFilter/ParkingFilter';
import PantryFilter from '../pantryFilter/Pantryfilter';
import SvgIcons from '../svgs/SvgIcons';
import { ITabButton } from '../parkingTypes';
import { useAppDispatch, useAppSelector } from '../hook';
import { setAssetsType, resetFilter } from '../../../store/slices/parking/parkingSlice';
import { disableBodyScroll, enableBodyScroll } from '../body-scroll-lock';
import MainModal from '../MainModal';
import SimpleButton from '../SimpleButton';
import MobileFilterButton from './MobileFilterButton';
import { getFilteredCount } from '../../../store/slices/parking/parkingSelectors';

function TabButton({ title, isActive, onClick }: ITabButton) {
    return (
        <span className={isActive ? styles.active : ''} onClick={() => onClick()}>
            {title}
        </span>
    );
}

export default function AssetsFilter() {
    const dispatch = useAppDispatch();
    const widthTablet = useAppSelector((state) => state.main.breakpoint.tablet);
    const width = useAppSelector((state) => state.main.width);
    const isAdaptive = width <= widthTablet;
    const [showModal, setShowModal] = useState(false);
    const filtered: number = useAppSelector(getFilteredCount);

    useEffect((): void => {
        showModal ? disableBodyScroll() : enableBodyScroll();
    }, [showModal]);

    const chooseTab = useCallback((isParkingTab: boolean) => {
        setIsParkingActive(isParkingTab);
        dispatch(setAssetsType(isParkingTab ? 'parking' : 'pantry'));
    }, []);

    const allTabButtons: { [key: string]: ITabButton[] } = useMemo(
        () => ({
            desktop: [
                {
                    title: 'выбор машино-мест',
                    onClick: () => {
                        chooseTab(true);
                    },
                },
                /*             {
                                title: 'выбор кладовых',
                                onClick: () => { chooseTab(false) },
                            },*/
            ],
            mobile: [
                {
                    title: 'машино-места',
                    onClick: () => {
                        chooseTab(true);
                    },
                },
            ],
        }),
        [chooseTab],
    );
    const tabButtons: ITabButton[] = isAdaptive ? allTabButtons.mobile : allTabButtons.desktop;

    const [isParkingActive, setIsParkingActive] = useState(true);

    function resetAssetsFilter() {
        dispatch(resetFilter());
    }

    function openModal(/*event: React.MouseEvent<HTMLButtonElement, MouseEvent>*/) {
        setShowModal(true);
    }

    function closeModal() {
        setShowModal(false);
    }

    return (
        <div className={styles.assetsFilter}>
            <div className={styles.topControls}>
                <div className={styles.tabButtons}>
                    {tabButtons.map((tabButton, index) => (
                        <TabButton
                            key={tabButton.title}
                            title={tabButton.title}
                            isActive={(index === 0 && isParkingActive) || (index === 1 && !isParkingActive)}
                            onClick={tabButton.onClick}
                        />
                    ))}
                </div>
                {isAdaptive && <MobileFilterButton openModal={openModal} />}
            </div>
            {!isAdaptive && (
                <>
                    <div className={styles.parkingPantrySections}>{isParkingActive ? <ParkingFilter /> : <PantryFilter />}</div>
                    <div className={styles.reset}>
                        <button onClick={() => resetAssetsFilter()}>
                            <span>Сбросить фильтр</span>
                            <SvgIcons id={'reset-parking-filter'} theme='light' />
                        </button>
                    </div>
                </>
            )}
            <MainModal
                theme={'dark'}
                show={showModal}
                iconMobileId={'close-modal-small-light'}
                iconDesktopId={'close-modal-large-light'}
                modalClassName={styles.modalContent}
                closeModal={() => closeModal()}
            >
                <div className={styles.modal}>
                    <div className={styles.parkingPantrySections}>{isParkingActive ? <ParkingFilter /> : <PantryFilter />}</div>

                    <div className={styles.modalButtons}>
                        {/*<Link href={'/list'}></Link>*/}
                        <SimpleButton
                            text={'сбросить'}
                            func={() => resetAssetsFilter()}
                            type={'button'}
                            size={'medium'}
                            color={'light'}
                            outline={true}
                        >
                            <div>
                                <SvgIcons id={'reset-parking-filter-rounded'} />
                            </div>
                        </SimpleButton>

                        <SimpleButton
                            func={() => closeModal()}
                            outline={true}
                            text={filtered === 0 ? 'ничего не найдено' : `показать ${filtered}`}
                            type={'button'}
                            color={'light'}
                            size={'medium'}
                            disabled={filtered === 0}
                        >
                            <div className={styles.svgButtonWrapper}>
                                <SvgIcons id={'mobile-filter-arrow-right'} />
                            </div>
                        </SimpleButton>
                    </div>
                </div>
            </MainModal>
        </div>
    );
}

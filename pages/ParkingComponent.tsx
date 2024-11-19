import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { IAnimation, transition900, transition1800 } from '../animation_helpers';

import styles from './ParkingComponent.module.scss';
import AssetsFilter from './components/assetsFilter/AssetsFilter';
import AssetsChoice from './components/assetsChoice/AssetsChoice';
import ParkingSummary from './components/summary/ParkingSummary';
import { useAppDispatch } from '../hook';
import { useEffect } from 'react';
import { fetchParking } from '../store/api/api';

type IntroAnimations = {
    [key in 'bg' | 'title_highlighted' | 'title_light' | 'title_light_adaptive']?: IAnimation;
};

const initial: IntroAnimations = {
    bg: {
        initial: { scale: 1.1 },
        animate: { scale: 1 },
        transition: transition1800,
    },
    title_highlighted: {
        initial: { y: '20vw' },
        animate: { y: 0 },
        transition: { delay: 0.5, ...transition900 },
    },
    title_light: {
        initial: { x: '-40vw' },
        animate: { x: 0 },
        transition: { delay: 0.5, ...transition900 },
    },
    title_light_adaptive: {
        initial: { x: '-40vw' },
        animate: { x: 0 },
        transition: { delay: 0.5, ...transition900 },
    },
};

export default function ParkingComponent() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (dispatch) {
            dispatch(fetchParking());
        }
    }, [dispatch]);
    return (
        <>
            <Head>
                <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' />
            </Head>
            <div className={styles.parking}>
                <motion.div className={styles.bgWrapper} {...initial.bg}>
                    <Image src='/images/parking/bg_parking.png' alt='background image' fill className={styles.bg} />
                </motion.div>
                <h1 className={styles.title}>
                    <motion.span {...initial.title_highlighted}>Паркинг</motion.span>
                    <motion.span className={styles.light} {...initial.title_light}>
                        и&nbsp;&nbsp;кладовые
                    </motion.span>
                </h1>
                <AssetsFilter />
                <AssetsChoice />
                <ParkingSummary />
            </div>
        </>
    );
}

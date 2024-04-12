import styles from './InfoSection.module.css';

import Image from 'next/image';
import quizSVG from '../../public/quizSVG.svg';

import { IoSpeedometerOutline } from "react-icons/io5";
import { HiMiniDevicePhoneMobile } from "react-icons/hi2";
import { IoIosCreate } from "react-icons/io";

import { motion } from 'framer-motion';

export default function InfoSection() {
    return (
        <section className={styles.infoSection}>
            <h1 className={styles.infoTitle}>Where <span className={styles.knowledgetext}>knowledge</span> meets <span className={styles.funtext}>fun</span>.</h1>
            <div className={styles.infoContent}>
                <motion.div className={styles.image} viewport={{ once: true, amount: 0.3 }} initial={{ opacity: 0, y: 15, scale: 0.99 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: 'tween', duration: 0.75 }}>
                    <Image width={500} height={500} src={quizSVG} alt={"/"}></Image>
                </motion.div>
                <ul className={styles.infoList}>
                    <motion.div viewport={{ once: true, amount: 0.5 }} initial={{ opacity: 0, y: 15, scale: 0.99 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: 'tween', duration: 0.75 }} key="create" className={styles.listItemContainer}>
                        <IoIosCreate className={styles.icon} />
                        <li className={styles.listItem}>
                            <h2>Creative</h2>
                            <p>Create your own unique quizzes!</p>
                        </li>
                    </motion.div>
                    <motion.div viewport={{ once: true, amount: 0.5 }} initial={{ opacity: 0, y: 15, scale: 0.99 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: 'tween', duration: 0.75 }} key="fast" className={styles.listItemContainer}>
                        <IoSpeedometerOutline className={styles.icon}></IoSpeedometerOutline>
                        <li className={styles.listItem}>
                            <h2>Fast</h2>
                            <p>Start and resume quizzes with speed!</p>
                        </li>
                    </motion.div>
                    <motion.div viewport={{ once: true, amount: 0.5 }} initial={{ opacity: 0, y: 15, scale: 0.99 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: 'tween', duration: 0.75 }} key="responsive" className={styles.listItemContainer}>
                        <HiMiniDevicePhoneMobile className={styles.icon} />
                        <li className={styles.listItem}>
                            <h2>Responsive</h2>
                            <p>Do your favourite quizzes on mobile!</p>
                        </li>
                    </motion.div>
                </ul>
            </div >
        </section >
    )
}

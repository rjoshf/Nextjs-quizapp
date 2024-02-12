import styles from './InfoSection.module.css';

import Image from 'next/image';
import quizSVG from '../../public/quizSVG.svg';

import { IoSpeedometerOutline } from "react-icons/io5";
import { HiMiniDevicePhoneMobile } from "react-icons/hi2";
import { IoIosCreate } from "react-icons/io";

const InfoSection: React.FC<{}> = ({ }) => {

    return (
        <section className={styles.infoSection}>
            <h1 className={styles.infoTitle}>Where knowledge meets fun.</h1>
            <div className={styles.infoContent}>
                <Image width={500} height={500} src={quizSVG} alt={"/"}></Image>
                <ul className={styles.infoList}>
                    <div key="create" className={styles.listItemContainer}>
                        <IoIosCreate className={styles.icon} />
                        <li className={styles.listItem}>
                            <h2>Create</h2>
                            <p>Create your own unique quizzes!</p>
                        </li>
                    </div>
                    <div key="fast" className={styles.listItemContainer}>
                        <IoSpeedometerOutline className={styles.icon}></IoSpeedometerOutline>
                        <li className={styles.listItem}>
                            <h2>Speed</h2>
                            <p>Create and start quizzes with speed!</p>
                        </li>
                    </div>
                    <div key="responsive" className={styles.listItemContainer}>
                        <HiMiniDevicePhoneMobile className={styles.icon} />
                        <li className={styles.listItem}>
                            <h2>Responsive</h2>
                            <p>Do your favourite quizzes on mobile too!</p>
                        </li>
                    </div>
                </ul>
            </div >
        </section >
    )

}

export default InfoSection;
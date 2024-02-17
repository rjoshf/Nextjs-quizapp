import styles from './SocialSection.module.css';

import { motion, useInView } from 'framer-motion'

import Image from 'next/image';
import socialmediaSVG from '../../public/socialmediaSVG.svg';
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa6";
import { IoLogoGithub } from "react-icons/io";
import { FaTiktok } from "react-icons/fa";
import { FaReddit } from "react-icons/fa";
import { useRef } from 'react';

const defaultAnimations = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
    }
}

const SocialSection: React.FC<{}> = ({ }) => {
    const inViewRef = useRef(null);
    const isInView = useInView(inViewRef, { amount: 0.3, once: true });

    const socialMediaArray = [FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaYoutube, FaDiscord, IoLogoGithub, FaTiktok, FaReddit]

    return (
        <section className={styles.socialSection}>
            <h1 className={styles.title}>Follow us on our <span className={styles.socialText}>social channels</span></h1>
            <div className={styles.sectionContent}>
                <motion.ul ref={inViewRef} initial="hidden" animate={isInView ? "visible" : "hidden"} transition={{ staggerChildren: 0.4 }} className={styles.socialIconList}>
                    {socialMediaArray.map((Icon, index) => <motion.li variants={defaultAnimations} key={index}><Icon className={styles.icon}></Icon></motion.li>)}
                </motion.ul>
                <motion.div className={styles.image} viewport={{ once: true, amount: 0.3 }} initial={{ opacity: 0, y: 15, scale: 0.99 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: 'tween', duration: 0.75 }}>
                    <Image width={500} height={500} src={socialmediaSVG} alt={''}></Image>
                </motion.div>
            </div>
        </section>
    )
}

export default SocialSection
'use client'

import styles from './HomePage.module.css'

import Link from "next/link";

import { motion } from "framer-motion"

import { useEffect, useState } from 'react'

const HomePage: React.FC<{}> = () => {

    const [startQuizText, setStartQuizText] = useState("Start Quiz")

    useEffect(() => {
        if (localStorage.getItem('userAnswers')) {
            setStartQuizText("Resume Quiz")
        }
    }, [])

    return (
        <>
            <h1 className={styles.mainTitle}>NextJS Quiz</h1>
            <div className={styles.card}>
                <h2 className={styles.cardTitle}>Welcome please press the button to start the quiz!</h2>
                <motion.div whileHover={{ scale: 1.01 }} transition={{ type: 'spring', stiffness: 150 }}>
                    <Link className={styles.startLink} href='/quiz'>{startQuizText}</Link>
                </motion.div>
            </div>
        </>
    )

}

export default HomePage
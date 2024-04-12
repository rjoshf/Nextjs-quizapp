import styles from './Answers.module.css';

import { useState, useEffect } from 'react';

import { motion } from 'framer-motion';

export default function Answers({ answers, userAnswers, answerState, handleSelectAnswer }: { answers: string[]; userAnswers: string[]; answerState: string; handleSelectAnswer: (answer: string) => void; }) {

    const [shuffledAnswers, setShuffledAnswers] = useState<string[]>();

    useEffect(() => {
        setShuffledAnswers([...answers].sort(() => Math.random() - 0.5))
    }, [])

    return (
        <ul className={styles.answers}>
            {shuffledAnswers?.map(answer => {
                const isSelected = userAnswers[userAnswers.length - 1] === answer
                let cssClass = '';

                if (answerState === 'answered' && isSelected) {
                    cssClass = styles.selected;
                }

                if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                    cssClass = styles[answerState];
                }

                return (
                    <motion.li whileHover={answerState === '' ? { scale: 1.01 } : { scale: 1.00 }} transition={{ type: 'spring', stiffness: 150 }} key={Math.random() * 1000} className={styles.answer}><button onClick={() => handleSelectAnswer(answer)} className={`${styles.answerButton} ${cssClass}`} disabled={answerState === '' ? false : true}>{answer}</button></motion.li>
                )
            })}
        </ul>
    )
}
import styles from './Answers.module.css';

import { useState, useEffect } from 'react';

import { motion } from 'framer-motion'

const Answers: React.FC<{ answers: string[]; userAnswers: string[]; answerState: string; handleSelectAnswer: (answer: string) => void; }> = ({ answers, userAnswers, answerState, handleSelectAnswer }) => {

    const [shuffledAnswers, setShuffledAnswers] = useState<string[]>();

    //useEffect is required to stop a hydration error due to the shuffling feature.
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
                    <motion.li whileHover={answerState === '' ? { scale: 1.01 } : { scale: 1.00 }} transition={{ type: 'spring', stiffness: 150 }} key={answer} className={styles.answer}><button onClick={() => handleSelectAnswer(answer)} className={`${styles.answerButton} ${cssClass}`} disabled={answerState === '' ? false : true}>{answer}</button></motion.li>
                )
            })}
        </ul>
    )

}

export default Answers
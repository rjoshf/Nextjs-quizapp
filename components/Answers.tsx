import styles from './Answers.module.css';

import { useState, useEffect } from 'react';

const Answers: React.FC<{ answers: string[] | undefined; userAnswers: string[]; answerState: string; handleSelectAnswer: (answer: string) => void; }> = ({ answers, userAnswers, answerState, handleSelectAnswer }) => {

    const [shuffledAnswers, setShuffledAnswers] = useState<string[]>()

    useEffect(() => {
        setShuffledAnswers(answers?.sort(() => Math.random() - 0.5))
    }, [answers])

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
                    <li key={answer} className={styles.answer}><button onClick={() => handleSelectAnswer(answer)} className={`${styles.answerButton} ${cssClass}`} disabled={answerState === '' ? false : true}>{answer}</button></li>
                )
            })}
        </ul>
    )

}

export default Answers
'use client'

import {useState} from 'react'

import QUESTIONS from './questions.js'

import styles from './Quiz.module.css'


export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState<string[]>([]);

    const activeQuestionIndex = userAnswers.length;

    function handleSelectAnswer(selectedAnswer: string) {
        setUserAnswers(prevState => [...prevState, selectedAnswer]);
    }

    return (
        <div className={styles.question}>
            <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
            <ul className={styles.answers}>
                {QUESTIONS[activeQuestionIndex].answers.map(answer => <li key={answer}><button onClick={() => handleSelectAnswer(answer)}>{answer}</button></li>)}
            </ul>
        </div>
    )
}
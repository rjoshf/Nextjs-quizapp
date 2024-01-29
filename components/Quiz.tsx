'use client'

import { useState, useEffect } from 'react'

import QUESTIONS from './questions.js'

import styles from './Quiz.module.css'


export default function Quiz() {
    //array containing the entered answers by the user.
    const [userAnswers, setUserAnswers] = useState<string[]>([]);
    const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);
    const activeQuestionIndex = userAnswers.length;

    //checking if quiz is over
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    //function to append the answer to the userAnswers array
    function handleSelectAnswer(selectedAnswer: string) {
        setUserAnswers(prevState => [...prevState, selectedAnswer]);
    }

    //useEffect required to stop hydration error as we are shuffling the answers causing a mismatch between React tree that was pre-rendered and server side value
    useEffect(() => {
        if (!quizIsComplete) {
            setShuffledAnswers(QUESTIONS[activeQuestionIndex].answers.sort(() => Math.random() - 0.5))
        }
    }, [quizIsComplete, activeQuestionIndex])

    if (quizIsComplete) {
        return (
            <div>
                <h2>Completed!</h2>
            </div>
        )
    }


    return (
        <>
            {!quizIsComplete && <div className={styles.quiz}>
                <div className={styles.question}>
                    <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                    <ul className={styles.answers}>
                        {shuffledAnswers.map(answer => <li key={answer}><button onClick={() => handleSelectAnswer(answer)}>{answer}</button></li>)}
                    </ul>
                </div>
            </div>}
            {quizIsComplete && <h2>Completed!</h2>}
        </>
    )
}
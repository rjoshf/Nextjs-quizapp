'use client'

import QuestionTimer from './QuestionTimer'

import { useState, useEffect, useCallback } from 'react'

import QUESTIONS from './questions.js'

import styles from './Quiz.module.css'


export default function Quiz() {

    const [answerState, setAnswerState] = useState('')
    //State containing the entered answers by the user.
    const [userAnswers, setUserAnswers] = useState<string[]>([]);

    //State containing the shuffled which are displayed to the user.
    const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);

    //constant to determine which question is currently active.
    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;

    //constant to represent if quiz has ended
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    //function to append the answer to the userAnswers array
    const handleSelectAnswer = (selectedAnswer: string) => {
        setAnswerState('answered');
        setUserAnswers(prevState => [...prevState, selectedAnswer]);

        setTimeout(() => {
            if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
                setAnswerState('correct');
            } else {
                setAnswerState('wrong');
            }

            setTimeout(() => {
                setAnswerState('')
            }, 2000)
        }, 1000)
    }

    //function to handle running out of time - useCallback is to cache this function to stop it over-running, as its a useEffect dependency
    const handleSkipAnswer = useCallback(() => {
        setUserAnswers(prevState => [...prevState, "question skipped"])
    }, [])

    //useEffect required to stop hydration error as we are shuffling the answers causing a mismatch between React tree that was pre-rendered and server side value.
    useEffect(() => {
        if (!quizIsComplete) {
            setShuffledAnswers(QUESTIONS[activeQuestionIndex].answers.sort(() => Math.random() - 0.5))
        }
    }, [quizIsComplete, activeQuestionIndex])

    //returned jsx for if quiz is complete
    if (quizIsComplete) {
        return (
            <div>
                <h2>Completed!</h2>
            </div>
        )
    }

    //returned jsx for if the quiz is not complete
    return (
        <>
            {!quizIsComplete && <div className={styles.quiz}>
                <div className={styles.question}>
                    <QuestionTimer key={activeQuestionIndex} timeout={10000} onTimeout={handleSkipAnswer}></QuestionTimer>
                    <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                    <ul className={styles.answers}>
                        {shuffledAnswers.map(answer => {
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
                </div>
            </div>}
            {quizIsComplete && <h2>Completed!</h2>}
        </>
    )
}
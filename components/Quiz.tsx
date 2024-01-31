'use client'

import Question from './Question'

import { useState, useCallback } from 'react'

import QUESTIONS from './questions.js'

import styles from './Quiz.module.css'

export default function Quiz() {

    const [answerState, setAnswerState] = useState('')
    //State containing the entered answers by the user.
    const [userAnswers, setUserAnswers] = useState<string[]>([]);

    const [score, setScore] = useState(0);

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
                setScore(prevState => prevState + 1)
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

    return (
        <>
            {!quizIsComplete && <div className={styles.quiz}>
                <Question
                    questionIndex={activeQuestionIndex}
                    answerState={answerState}
                    handleSelectAnswer={handleSelectAnswer}
                    handleSkipAnswer={handleSkipAnswer}
                    userAnswers={userAnswers}
                ></Question>
            </div>}
            {quizIsComplete && <h2>{score}</h2>}
        </>
    )
}
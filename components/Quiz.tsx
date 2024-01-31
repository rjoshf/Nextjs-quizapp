'use client'

import Question from './Question'

import { useState, useCallback, useRef } from 'react'

import QUESTIONS from './questions.js'

import styles from './Quiz.module.css'


export default function Quiz() {

    const [answerState, setAnswerState] = useState('')
    //State containing the entered answers by the user.
    const [userAnswers, setUserAnswers] = useState<string[]>([]);

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
                <Question
                    key={activeQuestionIndex}
                    title={QUESTIONS[activeQuestionIndex].text}
                    answerState={answerState}
                    activeQuestion={activeQuestionIndex}
                    answers={QUESTIONS[activeQuestionIndex].answers}
                    handleSelectAnswer={handleSelectAnswer}
                    handleSkipAnswer={handleSkipAnswer}
                    userAnswers={userAnswers}
                ></Question>
            </div>}
            {quizIsComplete && <h2>Completed!</h2>}
        </>
    )
}
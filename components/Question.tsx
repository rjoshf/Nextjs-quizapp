import QuestionTimer from "./QuestionTimer";
import Answers from './Answers'

import styles from './Question.module.css'

import QUESTIONS from './questions.js'

import { useState, useCallback, useEffect } from 'react'

const Question: React.FC<{}> = () => {

    const storedUserAnswers = localStorage.getItem('userAnswers');
    const initialUserAnswers = storedUserAnswers ? JSON.parse(storedUserAnswers) : [];
    const storedUserScore = localStorage.getItem('userScore');
    const initialUserScore = storedUserScore ? JSON.parse(storedUserScore) : [];

    const [answerState, setAnswerState] = useState('')
    const [userScore, setUserScore] = useState<number>(initialUserScore);
    const [userAnswers, setUserAnswers] = useState<string[]>(initialUserAnswers);

    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;

    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    // Load userAnswers from localStorage on component mount
    useEffect(() => {
        const storedUserAnswers = localStorage.getItem('userAnswers');
        if (storedUserAnswers) {
            setUserAnswers(JSON.parse(storedUserAnswers));
        }
        const storedUserScore = localStorage.getItem('userScore');
        if (storedUserScore) {
            setUserScore(JSON.parse(storedUserScore));
        }
    }, []);

    // Save userAnswers to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
    }, [userAnswers]);

    useEffect(() => {
        localStorage.setItem('userScore', JSON.stringify(+userScore));
    }, [userScore])

    const handleSelectAnswer = (selectedAnswer: string) => {
        setAnswerState('answered');
        setUserAnswers(prevState => [...prevState, selectedAnswer]);

        setTimeout(() => {
            if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
                setAnswerState('correct');
                setUserScore(prevUserScore => prevUserScore + 1);
            } else {
                setAnswerState('wrong');
            }

            setTimeout(() => {
                setAnswerState('')
            }, 2000)
        }, 1000)
    }

    const handleSkipAnswer = useCallback(() => {
        setUserAnswers(prevState => [...prevState, "question skipped"])
    }, [])

    return (
        <>
            {!quizIsComplete && <div className={styles.question}>
                {answerState === '' && <QuestionTimer key={activeQuestionIndex} timeout={10000} onTimeout={handleSkipAnswer}></QuestionTimer>}
                <h2>{QUESTIONS[activeQuestionIndex]?.text}</h2>
                <Answers answers={QUESTIONS[activeQuestionIndex]?.answers} answerState={answerState} userAnswers={userAnswers} handleSelectAnswer={handleSelectAnswer}></Answers>
            </div>}
            {quizIsComplete && (
                <>
                    <h1>{`Mark: ${userScore} out of ${QUESTIONS.length}`}</h1>
                    <h1>{`${Math.round(userScore / QUESTIONS.length * 100)}%`}</h1>
                </>
            )
            }
        </>
    )
}

export default Question
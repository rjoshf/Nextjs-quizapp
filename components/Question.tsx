import styles from './Question.module.css'

import QuestionTimer from "./QuestionTimer";
import Answers from './Answers'

import { useState, useCallback, useEffect } from 'react'
import Link from "next/link";
import { motion } from 'framer-motion'

type quizzes = { title: string; questions: { question: string; answers: { answer: string; }[]; }[]; id: string; }[]


const Question: React.FC<{ quizzes: quizzes }> = ({ quizzes }) => {

    //Initialising values for userAnswers and userScore states.
    const getLocalStorageItem = (key: string) => {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : null;
    };

    const [answerState, setAnswerState] = useState('')
    const [userScore, setUserScore] = useState<number>(getLocalStorageItem('userScore') || 0);
    const [userAnswers, setUserAnswers] = useState<string[]>(getLocalStorageItem('userAnswers') || []);

    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;

    const quizIsComplete = activeQuestionIndex === quizzes[0].questions.length;

    // Load userAnswers and userScore from localStorage on component mount
    useEffect(() => {
        console.log(quizzes[0].questions)
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

    // Save userScore to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('userScore', JSON.stringify(+userScore));
    }, [userScore])

    const answers = quizzes[0].questions[activeQuestionIndex]?.answers.map(answers => answers.answer)

    const handleSelectAnswer = (selectedAnswer: string) => {
        localStorage.removeItem('remainingTime');
        setAnswerState('answered');
        setUserAnswers(prevState => [...prevState, selectedAnswer]);

        setTimeout(() => {
            if (selectedAnswer === answers[0]) {
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
        localStorage.removeItem('remainingTime');
    }, [])

    return (
        <>
            {!quizIsComplete && <motion.div key={activeQuestionIndex} initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }} transition={{ duration: 0.4, type: 'tween' }} className={styles.question}>
                {answerState === '' && <QuestionTimer key={activeQuestionIndex} timeout={10000} onTimeout={handleSkipAnswer}></QuestionTimer>}
                <h2>{quizzes[0].questions[activeQuestionIndex]?.question}</h2>
                <Answers answers={answers} answerState={answerState} userAnswers={userAnswers} handleSelectAnswer={handleSelectAnswer}></Answers>
            </motion.div>}
            {quizIsComplete && (
                <>
                    <motion.div initial={{ opacity: 0.5 }}
                        animate={{ opacity: 1 }} transition={{ duration: 0.4, type: 'tween' }} className={styles.question}>
                        <h1 className={styles.resultstitle}>Quiz Completed!</h1>
                        <h1 className={styles.results}>{`Mark: ${userScore} out of ${quizzes[0].questions.length}`}</h1>
                        <h1 className={styles.resultspercentage}>{`Percentage: ${Math.round(userScore / quizzes[0].questions.length * 100)}%`}</h1>
                        <motion.div className={styles.homelink} whileHover={{ scale: 1.01 }} transition={{ type: 'spring', stiffness: 150 }}>
                            <Link className={styles.homebutton} href='/' onClick={() => localStorage.clear()}>Return Home</Link>
                        </motion.div>
                    </motion.div>
                </>
            )
            }
        </>
    )
}

export default Question
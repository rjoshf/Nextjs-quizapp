'use client'

import { useRouter } from 'next/navigation';

import styles from './HomePage.module.css'

import Link from "next/link";

import { motion } from "framer-motion"

import { useEffect, useState } from 'react'

type quizzes = { title: string; questions: { question: string; answers: { answer: string; }[]; }[]; id: string; }[]

const HomePage: React.FC<{ quizzes: quizzes }> = ({ quizzes }) => {

    const router = useRouter();

    const [startQuizText, setStartQuizText] = useState("Start Quiz");
    const [selectedOption, setSelectedOption] = useState(quizzes[0].id);

    useEffect(() => {
        if (localStorage.getItem('userAnswers')) {
            setStartQuizText("Resume Quiz")
        }
    }, [])

    const quizChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.currentTarget.options[event.currentTarget.selectedIndex].getAttribute('id')!);
    }

    function startQuiz() {
        router.push('/' + selectedOption);
    }

    return (
        <>
            <h1>{quizzes.map(quiz => quiz.title)}</h1>
            <nav>
                <motion.div whileHover={{ scale: 1.01 }} transition={{ type: 'spring', stiffness: 150 }}>
                    <Link className={styles.startLink} href='/newquiz'>Add new quiz</Link>
                </motion.div>
            </nav>
            <h1 className={styles.mainTitle}>NextJS Quiz</h1>
            <div className={styles.card}>
                <h2 className={styles.cardTitle}>Welcome please press the button to start the quiz!</h2>
                <motion.div whileHover={{ scale: 1.01 }} transition={{ type: 'spring', stiffness: 150 }}>
                    <button className={styles.startLink} onClick={startQuiz}>{startQuizText}</button>
                </motion.div>
                <select onChange={quizChangeHandler}>
                    {quizzes.map((quiz, index) => <option selected={index === 0 ? true : false} key={quiz.id} id={quiz.id}>{quiz.title}</option>)}
                </select>
            </div>
        </>
    )

}

export default HomePage
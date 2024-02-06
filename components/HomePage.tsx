'use client'

import { useRouter } from 'next/navigation';

import styles from './HomePage.module.css'

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
        router.push('/quiz/' + selectedOption);
    }

    return (
        <>
            <h1 className={styles.mainTitle}>NextQuiz</h1>
            <div className={styles.card}>
                <h2 className={styles.cardTitle}>Welcome please press the button to start the quiz!</h2>
                <motion.button whileHover={{ scale: 1.05 }} transition={{ type: 'spring', ease: "easeOut", duration: 0.1 }} className={styles.startLink} onClick={startQuiz}>{startQuizText}</motion.button>
                <div className={styles.selectcontainer}>
                    <select className={styles.quizdropdown} onChange={quizChangeHandler}>
                        {quizzes.map(quiz => <option key={quiz.id} id={quiz.id}>{quiz.title}</option>)}
                    </select>
                </div>
            </div>
        </>
    )

}

export default HomePage
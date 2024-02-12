'use client'

import { useRouter } from 'next/navigation';

import styles from './HomePage.module.css'

import { motion } from "framer-motion"

import { useEffect, useState, useContext } from 'react';
import Card from '../UI/Card';

import { QuizContext } from '@/app/context/store';
import InfoSection from './InfoSection';

type quizzes = { title: string; questions: { question: string; answers: { answer: string; }[]; }[]; id: string; }[]

const HomePage: React.FC<{ quizzes: quizzes }> = ({ quizzes }) => {

    const { updateQuizzes, updateQuizTimer, quizTimer } = useContext(QuizContext);

    const router = useRouter();

    const [hasQuizStarted, setHasQuizStarted] = useState<boolean>();
    const [selectedOption, setSelectedOption] = useState(() => {
        if (typeof window !== 'undefined') {
            const storedQuiz = localStorage.getItem('selectedQuiz');
            return storedQuiz ? JSON.parse(storedQuiz) : quizzes[0].id;
        } else {
            return quizzes[0].id;
        }
    });

    useEffect(() => {
        //load quizzes into the
        updateQuizzes(quizzes)

        // Check if selectedQuiz exists in localStorage
        const selectedQuizExists = localStorage.getItem('selectedQuiz');

        // If selectedQuiz exists, set hasQuizStarted to true
        if (selectedQuizExists) {
            setHasQuizStarted(true);
        } else {
            // If selectedQuiz doesn't exist, set hasQuizStarted to false and update the quiz timer
            setHasQuizStarted(false);
            updateQuizTimer(10000);
        }
    }, [])

    const quizChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.currentTarget.options[event.currentTarget.selectedIndex].getAttribute('id')!);
    }

    const timeChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        updateQuizTimer(+event.target.value * 1000)
    }

    function startQuiz(event: React.FormEvent) {
        event.preventDefault();
        localStorage.setItem('selectedQuiz', JSON.stringify(selectedOption));
        router.push('/quiz/' + selectedOption);
    }

    return (
        <>
            <motion.section viewport={{ once: true, amount: 0.5 }} initial={{ opacity: 0.5, y: 15, scale: 0.99 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: 'tween', duration: 0.75 }}>
                <h1 className={styles.mainTitle}>NEXTQUIZ</h1>
                <Card>
                    <h2 className={styles.cardTitle}>Welcome please press the button to start the quiz!</h2>
                    {hasQuizStarted === false && <>
                        <form onSubmit={startQuiz} className={styles.content}>
                            <label className={styles.label} htmlFor='quizselection'>Select a quiz:</label>
                            <div className={styles.selectcontainer}>
                                <select required id='quizselection' onChange={quizChangeHandler}>
                                    {quizzes.map(quiz => <option key={quiz.id} id={quiz.id}>{quiz.title}</option>)}
                                </select>
                                <span className={styles.customarrow}></span>
                            </div>
                            <label className={styles.label} htmlFor='quiztime'>Time for each question (seconds):</label>
                            <div className={styles.selectcontainer}>
                                <select className={styles.select} defaultValue={10} required onChange={timeChangeHandler} id='quiztime'>
                                    <option key={10}>10</option>
                                    <option key={20}>20</option>
                                    <option key={30}>30</option>
                                    <option key={40}>40</option>
                                    <option key={50}>50</option>
                                    <option key={60}>60</option>
                                </select>
                                <span className={styles.customarrow}></span>
                            </div>
                            <motion.button whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 100 }} className={styles.startLink}>Start Quiz</motion.button>
                        </form></>}
                    {hasQuizStarted === true && <motion.button whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 100 }} className={styles.startLink} onClick={startQuiz}>Resume Quiz</motion.button>}
                </Card>
            </motion.section>
            <InfoSection></InfoSection>
        </>
    )

}

export default HomePage
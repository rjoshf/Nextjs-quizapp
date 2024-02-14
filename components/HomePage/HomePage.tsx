'use client'

import { useRouter } from 'next/navigation';

import styles from './HomePage.module.css'

import { motion } from "framer-motion"

import { useEffect, useState, useContext } from 'react';
import Card from '../UI/Card';

import { QuizContext } from '@/app/context/store';
import InfoSection from './InfoSection';
import SocialSection from './SocialSection';

type quizzes = { title: string; questions: { question: string; answers: { answer: string; }[]; }[]; id: string; }[]

const HomePage: React.FC<{ quizzes: quizzes }> = ({ quizzes }) => {

    const { updateQuizzes, updateQuizTimer } = useContext(QuizContext);

    const router = useRouter();

    const [hasQuizStarted, setHasQuizStarted] = useState<boolean>(() => {
        const hasQuizBeenSelected = localStorage.getItem('selectedQuiz');
        if (hasQuizBeenSelected) {
            return true;
        } else {
            return false;
        }
    });

    const [selectedOption, setSelectedOption] = useState(() => {
        if (quizzes.length > 0) {
            const storedQuiz = localStorage.getItem('selectedQuiz');
            return storedQuiz ? JSON.parse(storedQuiz) : quizzes[0].id;
        } else {
            return null
        }
    });

    const [buttonText, setButtonText] = useState('Start Quiz')

    useEffect(() => {
        //load quizzes into the
        updateQuizzes(quizzes)

        // Check if selectedQuiz exists in localStorage
        const selectedQuizExists = localStorage.getItem('selectedQuiz');

        if (!selectedQuizExists) {
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
        setButtonText('Loading...')
        localStorage.setItem('selectedQuiz', JSON.stringify(selectedOption));
        router.push('/quiz/' + selectedOption);
    }

    return (
        <>
            <motion.section viewport={{ once: true, amount: 0.5 }} initial={{ opacity: 0.8, y: 5, scale: 0.99 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: 'tween', duration: 0.75 }}>
                <h1 className={styles.mainTitle}>NEXT<span className={styles.quiztext}>QUIZ</span></h1>
                <Card className={styles.quizCard}>
                    {!hasQuizStarted && <form onSubmit={startQuiz} className={styles.content}>
                        {quizzes.length !== 0 && <><label className={styles.label} htmlFor='quizselection'><h3 className={styles.labelTitle}>Select a quiz:</h3></label>
                            <div className={styles.selectcontainer}>
                                <select required id='quizselection' onChange={quizChangeHandler}>
                                    {quizzes.map(quiz => <option key={quiz.id} id={quiz.id}>{quiz.title}</option>)}
                                </select>
                                <span className={styles.customarrow}></span>
                            </div></>}
                        {quizzes.length === 0 && <h2 className={styles.noquiztext}>No quizzes detected. please add a quiz</h2>}
                        <label className={styles.label} htmlFor='quiztime'><h3 className={styles.labelTitle}>Time per question (seconds):</h3></label>
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
                        <motion.button whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 100 }} disabled={quizzes.length === 0 ? true : false} className={styles.startLink}>{buttonText}</motion.button>
                    </form>}
                    {hasQuizStarted === true && <motion.button whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 100 }} className={styles.startLink} onClick={startQuiz}>Resume Quiz</motion.button>}
                </Card>
            </motion.section>
            <InfoSection></InfoSection>
            <SocialSection></SocialSection>
        </>
    )

}

export default HomePage
'use client'

import { useRouter } from 'next/navigation';

import styles from './HomePage.module.css'

import { motion } from "framer-motion"

import { useEffect, useState } from 'react'
import Card from './UI/Card';

type quizzes = { title: string; questions: { question: string; answers: { answer: string; }[]; }[]; id: string; }[]

const HomePage: React.FC<{ quizzes: quizzes }> = ({ quizzes }) => {

    const router = useRouter();

    const [hasQuizStarted, setHasQuizStarted] = useState(false);
    const [selectedOption, setSelectedOption] = useState(() => {
        if (typeof window !== 'undefined') {
            const storedQuiz = localStorage.getItem('selectedQuiz');
            return storedQuiz ? JSON.parse(storedQuiz) : quizzes[0].id;
        } else {
            return quizzes[0].id;
        }
    });

    useEffect(() => {
        if (localStorage.getItem('selectedQuiz')) {
            setHasQuizStarted(true);
        }
    }, [])

    const quizChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.currentTarget.options[event.currentTarget.selectedIndex].getAttribute('id')!);
    }

    function startQuiz() {
        localStorage.setItem('selectedQuiz', JSON.stringify(selectedOption));

        console.log(selectedOption)
        router.push('/quiz/' + selectedOption);
    }

    return (
        <>
            <h1 className={styles.mainTitle}>NextQuiz</h1>
            <Card>
                <h2 className={styles.cardTitle}>Welcome please press the button to start the quiz!</h2>
                {!hasQuizStarted && <><motion.button whileHover={{ scale: 1.01 }} transition={{ type: 'spring', ease: "easeOut", duration: 0.1 }} className={styles.startLink} onClick={startQuiz}>Start Quiz</motion.button>
                    <div className={styles.selectcontainer}>
                        <select className={styles.quizdropdown} onChange={quizChangeHandler}>
                            {quizzes.map(quiz => <option key={quiz.id} id={quiz.id}>{quiz.title}</option>)}
                        </select>
                    </div></>}
                {hasQuizStarted && <motion.button whileHover={{ scale: 1.01 }} transition={{ type: 'spring', ease: "easeOut", duration: 0.1 }} className={styles.startLink} onClick={startQuiz}>Resume Quiz</motion.button>}
            </Card>
        </>
    )

}

export default HomePage
'use client'

import { useRouter } from 'next/navigation';

import styles from './HomePage.module.css'

import { motion } from "framer-motion"

import { useEffect, useState, useContext } from 'react';
import Card from './UI/Card';

import { QuizContext } from '@/app/context/store';

type quizzes = { title: string; questions: { question: string; answers: { answer: string; }[]; }[]; id: string; }[]

const HomePage: React.FC<{ quizzes: quizzes }> = ({ quizzes }) => {

    const { loadedQuizzes, updateQuizzes } = useContext(QuizContext);

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
        updateQuizzes(quizzes)
        if (localStorage.getItem('selectedQuiz')) {
            setHasQuizStarted(true);
        }
    }, [])

    useEffect(() => {
        console.log(loadedQuizzes);
    }, [loadedQuizzes]);

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
                {!hasQuizStarted && <><motion.button whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 100 }} className={styles.startLink} onClick={startQuiz}>Start Quiz</motion.button>
                    <div className={styles.selectcontainer}>
                        <select className={styles.quizdropdown} onChange={quizChangeHandler}>
                            {quizzes.map(quiz => <option key={quiz.id} id={quiz.id}>{quiz.title}</option>)}
                        </select>
                    </div></>}
                {hasQuizStarted && <motion.button whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 100 }} className={styles.startLink} onClick={startQuiz}>Resume Quiz</motion.button>}
            </Card>
        </>
    )

}

export default HomePage
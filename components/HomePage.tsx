'use client'

import { useRouter } from 'next/navigation';

import styles from './HomePage.module.css'

import { motion } from "framer-motion"

import { useEffect, useState, useContext } from 'react';
import Card from './UI/Card';

import { QuizContext } from '@/app/context/store';

type quizzes = { title: string; questions: { question: string; answers: { answer: string; }[]; }[]; id: string; }[]

const HomePage: React.FC<{ quizzes: quizzes }> = ({ quizzes }) => {

    const { updateQuizzes, updateQuizTimer, quizTimer } = useContext(QuizContext);

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

    const quizChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.currentTarget.options[event.currentTarget.selectedIndex].getAttribute('id')!);
    }

    const timeChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (+event.target.value < 10 || +event.target.value > 60) {
            return;
        }
        updateQuizTimer(+event.target.value * 1000)
        console.log(quizTimer)
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
                        <label htmlFor='quiztime'>Time available for each question</label>
                        <input onChange={timeChangeHandler} id='quiztime' type="number" inputMode='numeric' max="60" min="10" step="10"></input>
                    </div></>}
                {hasQuizStarted && <motion.button whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 100 }} className={styles.startLink} onClick={startQuiz}>Resume Quiz</motion.button>}
            </Card>
        </>
    )

}

export default HomePage
'use client'
import { useRouter } from "next/navigation";

import Card from "./UI/Card";

import styles from './DeleteQuiz.module.css';

import { motion } from 'framer-motion';

type quizzes = { title: string; questions: { question: string; answers: { answer: string; }[]; }[]; id: string; }[]

const DeleteQuiz: React.FC<{ quizzes: quizzes }> = ({ quizzes }) => {
    const router = useRouter()

    const quizDeleteHandler = async (id: string) => {
        await fetch(`/api/deletequiz?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })

        router.refresh();
    }


    return (
        <>
            <h1 className={styles.title}>Delete a quiz</h1>
            <Card>
                <ul className={styles.deleteQuizList}>
                    {quizzes.map(quiz => <li className={styles.deleteQuizItem} key={quiz.id}><div>{quiz.title}</div><motion.button whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 100 }} className={styles.deleteButton} onClick={() => quizDeleteHandler(quiz.id)}>Delete Quiz</motion.button></li>)}
                </ul>
            </Card>
        </>
    )

}

export default DeleteQuiz
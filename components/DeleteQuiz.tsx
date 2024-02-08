'use client'
import { useRouter } from "next/navigation";

import Card from "./UI/Card";

import styles from './DeleteQuiz.module.css';

import { motion } from 'framer-motion';
import { useState } from "react";
import Modal from "./UI/Modal";
import DeleteConfirmation from "./UI/DeleteConfirmation";

type quizzes = { title: string; questions: { question: string; answers: { answer: string; }[]; }[]; id: string; }[]

const DeleteQuiz: React.FC<{ quizzes: quizzes }> = ({ quizzes }) => {
    const router = useRouter()
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    const showModalHandler = (id: string) => {
        setShowModal(true);
        setSelectedId(id);
    }

    const closeModalHandler = () => {
        setShowModal(false);
    }

    const quizDeleteHandler = async () => {
        setIsDeleting(true);
        await fetch(`/api/deletequiz?id=${selectedId}`, {
            method: 'DELETE',
        })
        router.refresh();
        //clean up
        setIsDeleting(false);
        setSelectedId('');
    }


    return (
        <>
            {showModal && <Modal open={showModal ? true : false} onClose={closeModalHandler}>
                <DeleteConfirmation onConfirm={quizDeleteHandler} onCancel={closeModalHandler}></DeleteConfirmation>
            </Modal>}
            <h1 className={styles.title}>Delete a quiz</h1>
            <Card>
                <ul className={styles.deleteQuizList}>
                    {quizzes.map(quiz => <li className={styles.deleteQuizItem} key={quiz.id}><div>{quiz.title}</div><motion.button whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 100 }} className={styles.deleteButton} onClick={() => showModalHandler(quiz.id)}>{isDeleting && selectedId === quiz.id ? "Deleting Quiz..." : "Delete Quiz"}</motion.button></li>)}
                </ul>
            </Card>
        </>
    )

}

export default DeleteQuiz
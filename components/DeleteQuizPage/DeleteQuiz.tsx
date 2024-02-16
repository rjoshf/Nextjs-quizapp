'use client'
import { useRouter } from "next/navigation";

import Card from "../UI/Card";

import styles from './DeleteQuiz.module.css';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from "react";
import Modal from "../UI/Modal";
import DeleteConfirmation from "../UI/DeleteConfirmation";
import { QuizContext } from '@/app/context/store';
import { useContext } from 'react';

const DeleteQuiz: React.FC<{}> = () => {

    const router = useRouter()
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    const { updateQuizzes, loadedQuizzes } = useContext(QuizContext);

    const showModalHandler = (id: string) => {
        setShowModal(true);
        setSelectedId(id);
    }

    const closeModalHandler = () => {
        setShowModal(false);
    }

    const quizDeleteHandler = async () => {
        setShowModal(false);
        setIsDeleting(true);
        await fetch(`/api/deletequiz?id=${selectedId}`, {
            method: 'DELETE',
        });
        //update context
        updateQuizzes(loadedQuizzes.filter(quiz => quiz.id !== selectedId));
        router.refresh();
        //clean up
        setIsDeleting(false);
        setSelectedId("");
    }

    return (
        <motion.section viewport={{ once: true, amount: 0.5 }} initial={{ opacity: 0.8, y: 5, scale: 0.99 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: 'tween', duration: 0.75 }}>
            <AnimatePresence>
                {showModal && <Modal open={showModal ? true : false} onClose={closeModalHandler}>
                    <DeleteConfirmation onConfirm={quizDeleteHandler} onCancel={closeModalHandler}></DeleteConfirmation>
                </Modal>}
            </AnimatePresence>
            <h1 className={styles.title}>Delete a quiz</h1>
            <div className={styles.deletequizcontainer}>
                <Card>
                    <ul className={styles.deleteQuizList}>
                        {loadedQuizzes.map(quiz => <li className={styles.deleteQuizItem} key={quiz.id}><div>{quiz.title}</div><motion.button whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 100 }} className={styles.deleteButton} onClick={() => showModalHandler(quiz.id)}>{isDeleting && selectedId === quiz.id ? "Deleting Quiz..." : "Delete Quiz"}</motion.button></li>)}
                    </ul>
                </Card>
            </div>
        </motion.section>
    )

}

export default DeleteQuiz;
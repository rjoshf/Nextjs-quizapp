import Card from '../UI/Card';
import styles from './QuizNotFound.module.css'
import { useRouter } from "next/navigation";

import { motion } from 'framer-motion'
import { useState } from 'react';

const QuizNotFound: React.FC<{}> = () => {
    const [buttonText, setButtonText] = useState("Reset Quizzes")
    const router = useRouter();

    const resetHandler = () => {
        setButtonText("Resetting...")
        localStorage.clear();
        router.push("/");
        router.refresh();
    }

    return (
        <>
            <header className={styles.header}><h1>Quiz Not found</h1></header>
            <Card>
                <motion.button whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 100 }} className={styles.resetButton} onClick={resetHandler}>{buttonText}</motion.button>
            </Card>
        </>
    )
};

export default QuizNotFound;
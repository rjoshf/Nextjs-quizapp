import { motion } from 'framer-motion';

import { useState } from 'react';

import { useRouter } from "next/navigation";

import styles from './Results.module.css';

type quizzQuestions = {
    question: string;
    answers: {
        answer: string;
    }[];
}[];

const Results: React.FC<{ quizzQuestions: quizzQuestions; userScore: number; userAnswers: string[] }> = ({ quizzQuestions, userScore, userAnswers }) => {
    const router = useRouter();

    const [endQuizText, setEndQuizText] = useState("End Quiz")

    const endQuiz = () => {
        setEndQuizText("Ending...")
        localStorage.clear();
        router.push("/");
        router.refresh();
    }

    return (
        <section>
            <div>
                <motion.div initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }} transition={{ duration: 0.4, type: 'tween' }} className={styles.question}>
                    <h2 className={styles.resultstitle}>Quiz Completed!</h2>
                    <h2 className={styles.results}>{`Mark: ${userScore} out of ${quizzQuestions.length}`}</h2>
                    <h2 className={styles.resultspercentage}>{`Percentage: ${Math.round(userScore / quizzQuestions.length * 100)}%`}</h2>
                    <motion.button whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 100 }} className={styles.homebutton} onClick={endQuiz}>{endQuizText}</motion.button>
                </motion.div>
            </div>
            <div className={styles.summarySection}>
                <h2>Summary</h2>
                <ul className={styles.questionList}>
                    {quizzQuestions.map((question, index) =>
                        <li key={question.question}>
                            <div className={styles.resultQuestionCard}>
                                <div className={styles.questionItem}>{`Question ${index + 1}: `}{question.question}</div>
                                <div className={`${styles.answerItem} ${userAnswers[index] === question.answers[0].answer ? styles.correct : styles.incorrect}`}>Your Answer: {userAnswers[index]}</div>
                                {userAnswers[index] !== question.answers[0].answer &&
                                    <div className={styles.correctAnswer}>
                                        Correct Answer: {question.answers[0].answer}
                                    </div>
                                }
                            </div>
                        </li>)}
                </ul>
            </div>
        </section>
    )
}

export default Results;
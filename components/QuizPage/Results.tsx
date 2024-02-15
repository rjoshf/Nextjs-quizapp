import { motion } from 'framer-motion';

import { useRouter } from "next/navigation";

import styles from './Results.module.css'

type quizzQuestions = {
    question: string;
    answers: {
        answer: string;
    }[];
}[];

const Results: React.FC<{ quizzQuestions: quizzQuestions; userScore: number; userAnswers: string[] }> = ({ quizzQuestions, userScore, userAnswers }) => {
    const router = useRouter();

    const endQuiz = () => {
        localStorage.clear();
        router.push("/");
        router.refresh();
    }

    return (
        <section>
            <div>
                <motion.div initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }} transition={{ duration: 0.4, type: 'tween' }} className={styles.question}>
                    <h1 className={styles.resultstitle}>Quiz Completed!</h1>
                    <h1 className={styles.results}>{`Mark: ${userScore} out of ${quizzQuestions.length}`}</h1>
                    <h1 className={styles.resultspercentage}>{`Percentage: ${Math.round(userScore / quizzQuestions.length * 100)}%`}</h1>
                    <motion.button whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 100 }} className={styles.homebutton} onClick={endQuiz}>End Quiz</motion.button>
                </motion.div>
            </div>
            <div>
                <ul>
                    {quizzQuestions.map((question, index) =>
                        <li key={question.question}>
                            <div>{question.question}</div>
                            <div>Your Answer: {userAnswers[index]}</div>
                            {userAnswers[index] !== question.answers[0].answer &&
                                <div>
                                    Correct Answer: {question.answers[0].answer}
                                </div>
                            }
                        </li>)}
                </ul>
            </div>
        </section>
    )
}

export default Results;
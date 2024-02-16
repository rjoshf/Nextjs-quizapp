import { motion } from 'framer-motion';

import styles from './QuizSection.module.css';

import Card from '../UI/Card';

type quizzes = { title: string; questions: { question: string; answers: { answer: string; }[]; }[]; id: string; }[]

const QuizSection: React.FC<{ hasQuizStarted: boolean; quizzes: quizzes; startQuiz: (event: React.FormEvent) => void; quizChangeHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void; timeChangeHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void; buttonText: string; }> = ({ hasQuizStarted, quizzes, startQuiz, quizChangeHandler, timeChangeHandler, buttonText }) => {

    return (
        <motion.section viewport={{ once: true, amount: 0.5 }} initial={{ opacity: 0.8, y: 5, scale: 0.99 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: 'tween', duration: 0.75 }}>
            <h1 className={styles.mainTitle}>NEXT<span className={styles.quiztext}>QUIZ</span></h1>
            <Card className={styles.quizCard}>
                {!hasQuizStarted && <form onSubmit={startQuiz} className={styles.content}>
                    {quizzes.length !== 0 && <><label className={styles.label} htmlFor='quizselection'><h3 className={styles.labelTitle}>Select a quiz:</h3></label>
                        <div className={styles.selectcontainer}>
                            <select required id='quizselection' onChange={quizChangeHandler}>
                                {quizzes.map(quiz => <option key={quiz.id} value={quiz.id}>{quiz.title}</option>)}
                            </select>
                            <span className={styles.customarrow}></span>
                        </div></>}
                    {quizzes.length === 0 && <h2 className={styles.noquiztext}>No quizzes detected. Please add a quiz.</h2>}
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
                    <motion.button whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 100 }} disabled={quizzes.length === 0} className={styles.startLink}>{buttonText}</motion.button>
                </form>}
                {hasQuizStarted === true && <motion.button whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 100 }} className={styles.startLink} onClick={startQuiz}>Resume Quiz</motion.button>}
            </Card>
        </motion.section>
    )

}

export default QuizSection;
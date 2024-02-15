import { motion } from 'framer-motion';

import styles from './QuestionItem.module.css';

import QuestionTimer from './QuestionTimer';
import Answers from './Answers';

type quizzQuestions = {
    question: string;
    answers: {
        answer: string;
    }[];
}[];

const QuestionItem: React.FC<{ activeQuestionIndex: number; answerState: string; quizzQuestions: quizzQuestions; answers: string[]; userAnswers: string[]; handleSkipAnswer: () => void; handleSelectAnswer: (answer: string) => void }> = ({ activeQuestionIndex, answerState, quizzQuestions, answers, userAnswers, handleSkipAnswer, handleSelectAnswer }) => {

    return (
        <motion.div key={activeQuestionIndex} initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }} transition={{ duration: 0.4, type: 'tween' }} className={styles.question}>
            {answerState === '' && <QuestionTimer key={activeQuestionIndex} onTimeout={handleSkipAnswer}></QuestionTimer>}
            <h2>{quizzQuestions[activeQuestionIndex]?.question}</h2>
            <Answers answers={answers} answerState={answerState} userAnswers={userAnswers} handleSelectAnswer={handleSelectAnswer}></Answers>
        </motion.div>
    )
}

export default QuestionItem;
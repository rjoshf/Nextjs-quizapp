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

const QuestionItem: React.FC<{ activeQuestionIndex: number; answerState: string; quizzQuestions: quizzQuestions; answers: string[]; userAnswers: string[]; handleSkipAnswer: () => void; handleSelectAnswer: (answer: string) => void }> = ({ ...props }) => {

    return (
        <motion.div key={props.activeQuestionIndex} initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }} transition={{ duration: 0.4, type: 'tween' }} className={styles.question}>
            {props.answerState === '' && <QuestionTimer key={props.activeQuestionIndex} onTimeout={props.handleSkipAnswer}></QuestionTimer>}
            <h2>{props.quizzQuestions[props.activeQuestionIndex]?.question}</h2>
            <Answers answers={props.answers} answerState={props.answerState} userAnswers={props.userAnswers} handleSelectAnswer={props.handleSelectAnswer}></Answers>
        </motion.div>
    )
}

export default QuestionItem;
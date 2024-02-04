'use client'

import Question from './Question'

import styles from './Quiz.module.css'

type quizzQuestions = {
    question: string;
    answers: {
        answer: string;
    }[];
}[];

const Quiz: React.FC<{ quizzQuestions: quizzQuestions }> = ({ quizzQuestions }) => {

    return (
        <div className={styles.quiz}>
            <Question quizzQuestions={quizzQuestions}></Question>
        </div>
    )
}

export default Quiz
'use client'

import Question from './Question'

import styles from './Quiz.module.css'

type quizzes = {
    title: string;
    questions: {
        question: string;
        answers: {
            answer: string;
        }[];
    }[];
    id: string
}[]

const Quiz: React.FC<{ quizzes: quizzes }> = ({ quizzes }) => {

    return (
        <div className={styles.quiz}>
            <Question quizzes={quizzes}></Question>
        </div>
    )
}

export default Quiz
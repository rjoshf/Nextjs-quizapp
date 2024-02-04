'use client'

import Question from './Question'

import styles from './Quiz.module.css'

type quizz = {
    title: string;
    questions: {
        question: string;
        answers: {
            answer: string;
        }[];
    }[];
    id: string
}[]

const Quiz: React.FC<{ quizz: quizz }> = ({ quizz }) => {

    return (
        <div className={styles.quiz}>
            <Question quizz={quizz}></Question>
        </div>
    )
}

export default Quiz
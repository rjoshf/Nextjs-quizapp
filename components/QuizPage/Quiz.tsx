'use client'

//component imports
import Question from './Question'
import Card from '../UI/Card';

import styles from './Quiz.module.css'

type quizzQuestions = {
    question: string;
    answers: {
        answer: string;
    }[];
}[];

const Quiz: React.FC<{ quizzQuestions: quizzQuestions }> = ({ quizzQuestions }) => {

    return (
        <main className={styles.quizSection}>
            <Card>
                <Question quizzQuestions={quizzQuestions}></Question>
            </Card>
        </main>
    )
}

export default Quiz;
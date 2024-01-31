'use client'

import Question from './Question'

import styles from './Quiz.module.css'

export default function Quiz() {

    return (
        <div className={styles.quiz}>
            <Question></Question>
        </div>
    )
}
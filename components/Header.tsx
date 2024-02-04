'use client'

import styles from './Header.module.css'

const Header: React.FC<{ quizName: string }> = ({ quizName }) => {
    return (
        <header className={styles.header}>
            <h1>{quizName}</h1>
        </header>
    )
}

export default Header
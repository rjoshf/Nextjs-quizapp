import Link from 'next/link';

import styles from './Navbar.module.css'

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <Link className={styles.navlink} href="/">NextQuiz</Link>
            <Link className={styles.navlink} href="/newquiz">Add Quiz</Link>
        </nav>
    )
}
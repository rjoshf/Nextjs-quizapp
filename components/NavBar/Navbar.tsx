'use client';

import { usePathname } from 'next/navigation';

import Link from 'next/link';

import styles from './Navbar.module.css';

export default function Navbar() {

    const pathname = usePathname();

    return (
        <nav className={styles.navbar}>
            <Link className={`${styles.navlink} ${pathname.endsWith('/') ? styles.active : ''}`} href="/">NextQuiz</Link>
            <div className={styles.groupednavlinks}>
                <Link className={`${styles.navlink} ${pathname.startsWith('/newquiz') ? styles.active : ''}`} href="/newquiz">Add Quiz</Link>
                <Link className={`${styles.navlink} ${pathname.startsWith('/deletequiz') ? styles.active : ''}`} href="/deletequiz">Delete Quiz</Link>
            </div>
        </nav>
    );
}
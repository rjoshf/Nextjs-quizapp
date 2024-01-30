import { useState, useEffect } from "react";

import styles from './QuestionTimer.module.css'

const QuestionTimer: React.FC<{ timeout: number; onTimeout: () => void }> = ({ timeout, onTimeout }) => {
    const [remainingTime, setRemainingTime] = useState<number>(timeout);

    useEffect(() => {
        const timer = setTimeout(onTimeout, timeout);

        return () => {
            clearTimeout(timer);
        }
    }, [timeout, onTimeout])

    useEffect(() => {

        const interval = setInterval(() => {
            setRemainingTime(prevRemainingTime => prevRemainingTime - 50)
        }, 50);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <progress className={styles.questiontime} value={remainingTime} max={timeout}></progress>
    )
}

export default QuestionTimer;
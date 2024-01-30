import { useState, useEffect } from "react";

import styles from './QuestionTimer.module.css'

const QuestionTimer: React.FC<{ timeout: number; onTimeout: () => void }> = ({ timeout, onTimeout }) => {
    //state keeping track of the remaining time on the question.
    const [remainingTime, setRemainingTime] = useState<number>(timeout);

    //Setting the timer for a question and triggering the onTimeout function when time is up.
    useEffect(() => {
        const timer = setTimeout(onTimeout, timeout);

        //clean up function
        return () => {
            clearTimeout(timer);
        }
    }, [timeout, onTimeout])

    //Setting up intervals in which time is deducted from the time left for the question.
    useEffect(() => {

        const interval = setInterval(() => {
            setRemainingTime(prevRemainingTime => prevRemainingTime - 50)
        }, 50);

        //clean up function
        return () => {
            clearInterval(interval);
        };
    }, []);

    //jsx displaying the time progress bar on each question.
    return (
        <progress className={styles.questiontime} value={remainingTime} max={timeout}></progress>
    )
}

export default QuestionTimer;
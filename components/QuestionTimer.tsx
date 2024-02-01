import React, { useState, useEffect } from "react";
import styles from './QuestionTimer.module.css'

const QuestionTimer: React.FC<{ timeout: number; onTimeout: () => void; }> = ({ timeout, onTimeout }) => {
    // State keeping track of the remaining time on the question.
    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
        const storedTimeRemaining = localStorage.getItem('remainingTime');
        if (storedTimeRemaining) {
            setRemainingTime(JSON.parse(storedTimeRemaining));
        }
    }, []);

    // Setting the timer for a question and triggering the onTimeout function when time is up.
    useEffect(() => {
        const timer = setTimeout(() => {
            onTimeout();
            setRemainingTime(timeout); // Reset remaining time on timeout
        }, remainingTime);

        // Clean up function
        return () => {
            clearTimeout(timer);
        };
    }, [remainingTime, timeout, onTimeout]);

    // Setting up intervals in which time is deducted from the time left for the question.
    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime(prevRemainingTime => {
                const newRemainingTime = prevRemainingTime - 50;
                localStorage.setItem('remainingTime', JSON.stringify(newRemainingTime));
                return newRemainingTime;
            });
        }, 50);

        // Clean up function
        return () => {
            clearInterval(interval);
            localStorage.removeItem('remainingTime')
        };
    }, []);

    // JSX displaying the time progress bar on each question.
    return (
        <progress className={styles.questiontime} value={remainingTime} max={timeout}></progress>
    );
}

export default QuestionTimer;
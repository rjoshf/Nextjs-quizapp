import React, { useState, useEffect } from "react";
import styles from './QuestionTimer.module.css'

const QuestionTimer: React.FC<{ onTimeout: () => void; }> = ({ onTimeout }) => {
    const storedData = localStorage.getItem('quizData');

    // Safely parse storedData and ensure it has a valid timer property
    let quizTimer = 0; // Default to 0 or any other default timer value you prefer
    if (storedData) {
        const storedDataObject = JSON.parse(storedData);
        // Ensure storedDataObject has a timer property and it's a number
        if (storedDataObject && typeof storedDataObject.timer === 'number') {
            quizTimer = storedDataObject.timer;
        }
    }

    // State keeping track of the remaining time on the question.
    const [remainingTime, setRemainingTime] = useState(quizTimer);

    useEffect(() => {
        const timer = setTimeout(() => {
            onTimeout();
            setRemainingTime(quizTimer); // Reset remaining time on timeout
        }, remainingTime);

        return () => {
            clearTimeout(timer);
        };
    }, [remainingTime, quizTimer, onTimeout]);

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime(prevRemainingTime => {
                const newRemainingTime = prevRemainingTime - 50;
                localStorage.setItem('remainingTime', JSON.stringify(newRemainingTime));
                return newRemainingTime;
            });
        }, 50);

        const storedTimeRemaining = localStorage.getItem('remainingTime');
        if (storedTimeRemaining) {
            setRemainingTime(JSON.parse(storedTimeRemaining));
        }

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <progress className={styles.questiontime} value={remainingTime} max={quizTimer}></progress>
    );
}

export default QuestionTimer;
import React, { useState, useEffect, useContext } from "react";
import styles from './QuestionTimer.module.css';
import { QuizContext } from "@/app/context/store";

export default function QuestionTimer({ onTimeout }: { onTimeout: () => void }) {
    const { quizTimer } = useContext(QuizContext)

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
                if (prevRemainingTime) {
                    const newRemainingTime = prevRemainingTime - 50;
                    localStorage.setItem('remainingTime', JSON.stringify(newRemainingTime));
                    return newRemainingTime;
                }
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
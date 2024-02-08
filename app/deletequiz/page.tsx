'use client'

import DeleteQuiz from '@/components/DeleteQuiz';
import { QuizContext } from '@/app/context/store';
import { useContext, useEffect, useState } from 'react';

type Quiz = { title: string; questions: { question: string; answers: { answer: string }[] }[]; id: string }[];

export default function DeleteQuizPage() {
    const { loadedQuizzes } = useContext(QuizContext);
    const [storedQuizzes, setStoredQuizzes] = useState<Quiz>([]);

    useEffect(() => {
        // Check if loadedQuizzes is not empty or has changed
        if (loadedQuizzes && loadedQuizzes.length > 0) {
            // Store loadedQuizzes to localStorage
            localStorage.setItem('storedQuizzes', JSON.stringify(loadedQuizzes));
            // Update component state to reflect the newly stored quizzes
            setStoredQuizzes(loadedQuizzes);
        } else {
            // When loadedQuizzes is empty or unavailable, try to use localStorage
            const storedQuizzesFromLocalStorage = localStorage.getItem('storedQuizzes');
            if (storedQuizzesFromLocalStorage) {
                setStoredQuizzes(JSON.parse(storedQuizzesFromLocalStorage));
            }
        }
    }, [loadedQuizzes]); // This effect depends on loadedQuizzes, it updates whenever loadedQuizzes changes

    return (
        <DeleteQuiz quizzes={storedQuizzes}></DeleteQuiz>
    );
}
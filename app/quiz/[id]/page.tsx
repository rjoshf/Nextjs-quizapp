'use client'

import Header from "@/components/Header";
import Quiz from "@/components/Quiz";
import { QuizContext } from '@/app/context/store';
import { useContext, useState, useEffect } from 'react';

type Quiz = { title: string; questions: { question: string; answers: { answer: string }[] }[]; id: string };

export default function QuizPage({ params }: { params: { id: string } }) {
    const { loadedQuizzes } = useContext(QuizContext);

    const selectedQuiz = loadedQuizzes.find((quiz) => quiz.id === params.id); // Use find for a single item

    // Initialize storedQuiz from localStorage if available or fallback to an empty object
    const [storedQuiz, setStoredQuiz] = useState<Quiz>(() => {
        const storedData = localStorage.getItem('storedQuiz');
        return storedData ? JSON.parse(storedData) : null; // Adjust to handle null if necessary
    });

    useEffect(() => {
        // Only update localStorage and state if selectedQuiz is not null
        if (selectedQuiz) {
            localStorage.setItem('storedQuiz', JSON.stringify(selectedQuiz));
            setStoredQuiz(selectedQuiz);
        } else if (!storedQuiz) {
            // This logic assumes there's no selectedQuiz and storedQuiz is null
            // Attempt to load from localStorage only if storedQuiz hasn't been set
            const storedData = localStorage.getItem('storedQuiz');
            if (storedData) {
                setStoredQuiz(JSON.parse(storedData));
            }
        }
    }, [selectedQuiz]); // Depend on selectedQuiz to re-run when it changes

    if (!storedQuiz) {
        return <div>Loading...</div>; // Or some other loading/error state
    }

    return (
        <>
            <Header quizName={storedQuiz.title}></Header>
            <main>
                <Quiz quizzQuestions={storedQuiz.questions}></Quiz>
            </main>
        </>
    );
}
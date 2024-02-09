'use client'

import Header from "@/components/Header";
import Quiz from "@/components/Quiz";
import { QuizContext } from '@/app/context/store';
import { useContext, useState, useEffect } from 'react';

type Quiz = { title: string; questions: { question: string; answers: { answer: string }[] }[]; id: string };

export default function QuizPage({ params }: { params: { id: string } }) {
    const { loadedQuizzes, quizTimer } = useContext(QuizContext);

    const selectedQuiz = loadedQuizzes.find((quiz) => quiz.id === params.id);

    // Initialize storedQuiz and storedTimer from localStorage if available or fallback to null
    const [storedQuiz, setStoredQuiz] = useState<{ quiz: Quiz, timer: number } | null>(() => {
        const storedData = localStorage.getItem('quizData');
        return storedData ? JSON.parse(storedData) : null;
    });

    useEffect(() => {
        // Only update localStorage and state if selectedQuiz is not null and quizTimer is defined
        if (selectedQuiz && quizTimer !== undefined) {
            const quizData = { quiz: selectedQuiz, timer: quizTimer };
            localStorage.setItem('quizData', JSON.stringify(quizData));
            setStoredQuiz(quizData);
        } else if (!storedQuiz) {
            // Attempt to load from localStorage only if storedQuiz hasn't been set
            const storedData = localStorage.getItem('quizData');
            if (storedData) {
                setStoredQuiz(JSON.parse(storedData));
            }
        }
    }, [selectedQuiz, quizTimer]); // Depend on selectedQuiz and quizTimer to re-run when they change

    if (!storedQuiz) {
        return <div>Loading...</div>; // Or some other loading/error state
    }

    return (
        <>
            <Header quizName={storedQuiz.quiz.title}></Header>
            <main>
                <Quiz quizzQuestions={storedQuiz.quiz.questions}></Quiz>
            </main>
        </>
    );
}
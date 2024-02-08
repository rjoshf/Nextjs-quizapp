'use client'

import Header from "@/components/Header";
import Quiz from "@/components/Quiz";
import { QuizContext } from '@/app/context/store';
import { useContext } from 'react';


export default async function QuizPage({ params }: { params: { id: string } }) {
    const { loadedQuizzes } = useContext(QuizContext);

    const selectedQuiz = loadedQuizzes.filter((quiz) => quiz.id === params.id)

    const quizzQuestions = selectedQuiz[0].questions

    return (
        <>
            <Header quizName={selectedQuiz[0].title}></Header>
            <main>
                <Quiz quizzQuestions={quizzQuestions}></Quiz>
            </main>
        </>
    );
}
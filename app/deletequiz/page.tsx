'use client'

import DeleteQuiz from '@/components/DeleteQuizPage/DeleteQuiz';
import { QuizContext } from '@/app/context/store';
import { useContext } from 'react';

export default function DeleteQuizPage() {
    const { loadedQuizzes } = useContext(QuizContext);

    return (
        <DeleteQuiz quizzes={loadedQuizzes}></DeleteQuiz>
    );
}
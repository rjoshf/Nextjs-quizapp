"use client"

import React, { createContext, useState, ReactNode } from 'react';

type Quiz = { title: string; questions: { question: string; answers: { answer: string }[] }[]; id: string };

type QuizContextType = {
    loadedQuizzes: Quiz[];
    updateQuizzes: (quizzes: Quiz[]) => void;
};

const initialContext: QuizContextType = {
    loadedQuizzes: [],
    updateQuizzes: () => { },
};

export const QuizContext = createContext<QuizContextType>(initialContext);

type QuizProviderProps = {
    children: ReactNode;
};

export const QuizProvider = ({ children }: QuizProviderProps) => {
    const [loadedQuizzes, setQuizzes] = useState<Quiz[]>([]);

    const updateQuizzes = (quizzes: Quiz[]) => {
        setQuizzes(quizzes);
    };

    return (
        <QuizContext.Provider value={{ loadedQuizzes, updateQuizzes }}>
            {children}
        </QuizContext.Provider>
    );
};
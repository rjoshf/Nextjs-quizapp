"use client"

import React, { createContext, useState, ReactNode } from 'react';

type Quiz = { title: string; questions: { question: string; answers: { answer: string }[] }[]; id: string };

type QuizContextType = {
    loadedQuizzes: Quiz[];
    updateQuizzes: (quizzes: Quiz[]) => void;
    quizTimer: number | undefined; // Allow quizTimer to be undefined
    updateQuizTimer: (time: number) => void;
};

// Update the initialContext to reflect the possibility of quizTimer being undefined
const initialContext: QuizContextType = {
    loadedQuizzes: [],
    updateQuizzes: () => { },
    quizTimer: undefined, // Set to undefined initially
    updateQuizTimer: () => { },
};

export const QuizContext = createContext<QuizContextType>(initialContext);

type QuizProviderProps = {
    children: ReactNode;
};

export const QuizProvider = ({ children }: QuizProviderProps) => {
    const [loadedQuizzes, setQuizzes] = useState<Quiz[]>([]);
    // Initialize quizTimer with undefined
    const [quizTimer, setQuizTimer] = useState<number | undefined>(undefined);

    const updateQuizzes = (quizzes: Quiz[]) => {
        setQuizzes(quizzes);
    };

    const updateQuizTimer = (time: number) => {
        setQuizTimer(time);
    };

    return (
        <QuizContext.Provider value={{ loadedQuizzes, updateQuizzes, updateQuizTimer, quizTimer }}>
            {children}
        </QuizContext.Provider>
    );
};
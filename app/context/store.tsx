"use client"

import React, { createContext, useState, useEffect, ReactNode } from 'react';

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

const getInitialQuizState = () => {
    if (typeof window !== 'undefined') {
        const loadedQuizzes = localStorage.getItem("loadedQuizzes");
        return loadedQuizzes ? JSON.parse(loadedQuizzes) : [];
    }
    return [];
}

const getInitialTimerState = () => {
    if (typeof window !== 'undefined') {
        const quizTimer = localStorage.getItem("quizTimer");
        try {
            return quizTimer ? JSON.parse(quizTimer) : undefined;
        } catch (error) {
            console.error("Error parsing quizTimer JSON:", error);
            return undefined;
        }
    }
    return undefined;
}

export const QuizContext = createContext<QuizContextType>(initialContext);

type QuizProviderProps = {
    children: ReactNode;
};

export const QuizProvider = ({ children }: QuizProviderProps) => {
    const [loadedQuizzes, setQuizzes] = useState<Quiz[]>(getInitialQuizState);
    // Initialize quizTimer with undefined
    const [quizTimer, setQuizTimer] = useState<number | undefined>(getInitialTimerState);

    useEffect(() => {
        localStorage.setItem("loadedQuizzes", JSON.stringify(loadedQuizzes))
    }, [loadedQuizzes])

    const updateQuizzes = (quizzes: Quiz[]) => {
        setQuizzes(quizzes);
    };

    const updateQuizTimer = (time: number) => {
        setQuizTimer(time);
        // Store the timer value in localStorage
        localStorage.setItem("quizTimer", JSON.stringify(time))
    };

    return (
        <QuizContext.Provider value={{ loadedQuizzes, updateQuizzes, updateQuizTimer, quizTimer }}>
            {children}
        </QuizContext.Provider>
    );
};
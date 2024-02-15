'use client'

import Header from "@/components/QuizPage/Header";
import Quiz from "@/components/QuizPage/Quiz";
import QuizNotFound from "@/components/QuizPage/QuizNotFound";
import { useRouter } from "next/navigation";

export default function QuizPage({ params }: { params: { id: string } }) {
    const router = useRouter();

    //we reach out to local storage here so the data stays on page reload, otherwise whilst reloading the page shows quiz not found as selectedQuiz is undefined.
    const loadedQuizzesString = localStorage.getItem("loadedQuizzes");

    // Parse the string into an array of objects
    const loadedQuizzes = loadedQuizzesString ? JSON.parse(loadedQuizzesString) : [];

    // Check if selectedQuiz is defined before accessing its properties
    const selectedQuiz = loadedQuizzes.find((quiz: { id: string }) => quiz.id === params.id);

    if (!selectedQuiz) {
        return (
            <QuizNotFound></QuizNotFound>
        );
    }

    return (
        <>
            <Header quizName={selectedQuiz.title}></Header>
            <Quiz quizzQuestions={selectedQuiz.questions}></Quiz>
        </>
    );
}
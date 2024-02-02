'use client'

import NewQuizForm from "@/components/NewQuizForm";

type quizData = {
    title: string | undefined;
    questions: {
        question: string | undefined;
        answers: {
            answer: string | undefined;
        }[];
    }[];
}


export default function NewQuizPage() {

    const addQuizHandler = async (quizData: quizData) => {
        // console.log(JSON.stringify(quizData))
        const response = await fetch('/api/newquiz', {
            method: 'POST',
            body: JSON.stringify(quizData),
            headers: {
                'Content-Type': 'application/json'
            },
        })

    }

    return (
        <>
            <h1>Add a new quiz</h1>
            <NewQuizForm onAddQuiz={addQuizHandler}></NewQuizForm>
        </>
    )
}
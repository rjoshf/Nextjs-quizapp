'use client'

import NewQuizForm from "@/components/NewQuizPage/NewQuizForm";
import { useRouter } from "next/navigation";

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

    const router = useRouter()

    const addQuizHandler = async (quizData: quizData) => {

        await fetch('/api/newquiz', {
            method: 'POST',
            body: JSON.stringify(quizData),
            headers: {
                'Content-Type': 'application/json'
            },
        })

        router.push("/");
        router.refresh();
    }

    return (
        <NewQuizForm onAddQuiz={addQuizHandler}></NewQuizForm>
    )
}
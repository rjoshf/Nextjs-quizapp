'use client'

import { useRouter } from "next/navigation";
import NewQuizForm from "@/components/NewQuizPage/NewQuizForm";

type quizData = {
    title: string | undefined;
    questions: {
        question: string | undefined;
        answers: {
            answer: string | undefined;
        }[];
    }[];
}

const NewQuiz: React.FC<{}> = ({ }) => {
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

export default NewQuiz;
'use client'
import { useRouter } from "next/navigation";

type quizzes = { title: string; questions: { question: string; answers: { answer: string; }[]; }[]; id: string; }[]

const DeleteQuiz: React.FC<{ quizzes: quizzes }> = ({ quizzes }) => {
    const router = useRouter()

    const quizDeleteHandler = async (id: string) => {
        await fetch(`/api/deletequiz?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })

        router.refresh();
    }


    return (
        <ul>
            {quizzes.map(quiz => <li key={quiz.id}><div>{quiz.title}</div><button onClick={() => quizDeleteHandler(quiz.id)}>Delete Quiz</button></li>)}
        </ul>
    )

}

export default DeleteQuiz
import Header from "@/components/QuizPage/Header";
import Quiz from "@/components/QuizPage/Quiz";

export const metadata = {
    title: 'Quiz Page',
    description: "Play your favourite quizzes, answer questions and see your results!",
}

export default function QuizPage({ params }: { params: { id: string } }) {

    return (
        <Quiz params={params} />
    );
}
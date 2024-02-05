import { MongoClient } from 'mongodb';

import Header from "@/components/Header";
import Quiz from "@/components/Quiz";

type quizz = {
    title: string;
    questions: {
        question: string;
        answers: {
            answer: string;
        }[];
    }[];
    id: string;
}[]

async function getQuizzes() {
    // Connect to MongoDB
    const client = await MongoClient.connect('mongodb+srv://joshW:football101@cluster0.cwcph8s.mongodb.net/quizzes?retryWrites=true&w=majority');
    const db = client.db();

    // Access the Quizzes collection
    const quizzesCollection = db.collection('Quizzes');

    const quizzes = await quizzesCollection.find().toArray();

    client.close();

    const updatedQuizzesArray = quizzes.map(quiz => ({
        title: quiz.title,
        questions: quiz.questions,
        id: quiz._id.toString()
    }))

    return updatedQuizzesArray;
}

export default async function QuizPage({ params }: { params: { id: string } }) {

    console.log({ params })

    const quizz: quizz = await getQuizzes();

    const selectedQuiz = quizz.filter((quiz) => quiz.id === params.id)

    const quizzQuestions = selectedQuiz[0].questions

    return (
        <>
            <Header quizName={selectedQuiz[0].title}></Header>
            <main>
                <Quiz quizzQuestions={quizzQuestions}></Quiz>
            </main>
        </>
    );
}
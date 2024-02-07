import DeleteQuiz from '@/components/DeleteQuiz';
import { MongoClient } from 'mongodb';

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
        id: quiz._id.toString(),
    }))

    return updatedQuizzesArray;
}

type quizzes = { title: string; questions: { question: string; answers: { answer: string; }[]; }[]; id: string; }[]

export default async function deleteQuizPage() {

    const quizzes: quizzes = await getQuizzes();

    return (
        <DeleteQuiz quizzes={quizzes}></DeleteQuiz>
    )
}
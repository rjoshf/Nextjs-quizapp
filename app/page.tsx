import { MongoClient } from 'mongodb';
import { revalidatePath } from 'next/cache';

import HomePage from "@/components/HomePage/HomePage";

type quizzes = { title: string; questions: { question: string; answers: { answer: string; }[]; }[]; id: string; }[]

//fetch database data in server component to keep sensitive details hidden.
async function getQuizzes() {

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGO_URI is not defined');
  }

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db();

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

export default async function Home() {

  const quizzes: quizzes = await getQuizzes();

  revalidatePath("/");

  return (
    <HomePage quizzes={quizzes}></HomePage>
  );
}

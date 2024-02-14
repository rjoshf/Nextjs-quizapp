import { MongoClient } from 'mongodb'

import HomePage from "@/components/HomePage/HomePage";

type quizzes = { title: string; questions: { question: string; answers: { answer: string; }[]; }[]; id: string; }[]

//fetch database data in server component to keep sensitive details hidden.
async function getQuizzes() {

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGO_URI is not defined');
  }

  // Connect to MongoDB
  const client = await MongoClient.connect(process.env.MONGODB_URI);
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

export default async function Home() {

  const quizzes: quizzes = await getQuizzes();

  return (
    <>
      <HomePage quizzes={quizzes}></HomePage>
    </>
  );
}

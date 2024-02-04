import { MongoClient } from 'mongodb'

import HomePage from "@/components/HomePage";
import { NextPage } from 'next';

type quizzes = {
  title: string;
  questions: {
    question: string;
    answers: {
      answer: string;
    }[];
  }[];
  id: string
}

const Home: NextPage<{}> = ({ }) => {

  return (
    <>
      <HomePage></HomePage>
    </>
  );
}

export default Home;

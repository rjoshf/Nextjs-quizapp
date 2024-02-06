'use client'

//component imports
import Question from './Question'
import Card from './UI/Card';

type quizzQuestions = {
    question: string;
    answers: {
        answer: string;
    }[];
}[];

const Quiz: React.FC<{ quizzQuestions: quizzQuestions }> = ({ quizzQuestions }) => {

    return (
        <Card>
            <Question quizzQuestions={quizzQuestions}></Question>
        </Card>
    )
}

export default Quiz
import QuestionTimer from "./QuestionTimer";
import Answers from './Answers'

import styles from './Question.module.css'

import QUESTIONS from './questions.js'

const Question: React.FC<{ answerState: string; handleSelectAnswer: (answer: string) => void; handleSkipAnswer: () => void; userAnswers: string[], questionIndex: number }> = ({ answerState, handleSelectAnswer, handleSkipAnswer, userAnswers, questionIndex }) => {

    return (
        <div className={styles.question}>
            {answerState === '' && <QuestionTimer key={questionIndex} timeout={10000} onTimeout={handleSkipAnswer}></QuestionTimer>}
            <h2>{QUESTIONS[questionIndex]?.text}</h2>
            <Answers answers={QUESTIONS[questionIndex]?.answers} answerState={answerState} userAnswers={userAnswers} handleSelectAnswer={handleSelectAnswer}></Answers>
        </div>
    )
}

export default Question
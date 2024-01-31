import QuestionTimer from "./QuestionTimer";
import Answers from './Answers'

import styles from './Question.module.css'

const Question: React.FC<{ answerState: string; activeQuestion: number; answers: string[]; handleSelectAnswer: (answer: string) => void; handleSkipAnswer: () => void; title: string; userAnswers: string[] }> = ({ answerState, activeQuestion, answers, handleSelectAnswer, handleSkipAnswer, title, userAnswers }) => {

    return (
        <div className={styles.question}>
            <QuestionTimer key={activeQuestion} timeout={10000} onTimeout={handleSkipAnswer}></QuestionTimer>
            <h2>{title}</h2>
            <Answers answers={answers} answerState={answerState} userAnswers={userAnswers} handleSelectAnswer={handleSelectAnswer}></Answers>
        </div>
    )
}

export default Question
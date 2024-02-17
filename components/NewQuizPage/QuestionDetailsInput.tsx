
import styles from './QuestionDetailsInput.module.css';

type Answer = {
    answer: string;
};

type Question = {
    question: string;
    answers: Answer[];
};

const QuestionDetailsInput: React.FC<{ questions: Question[]; onQuestionUpdate: (questionIndex: number, questionText: string) => void; onAnswerUpdate: (questionIndex: number, answerIndex: number, answerText: string) => void }> = ({ questions, onQuestionUpdate, onAnswerUpdate }) => {

    return (
        <>
            {questions.map((question, questionIndex) => (
                <div key={questionIndex} className={styles.questionCard}>
                    <label className={styles.label} htmlFor={`question-${questionIndex}`}>Question {questionIndex + 1}</label>
                    <input
                        required
                        className={styles.input}
                        type="text"
                        id={`question-${questionIndex}`}
                        value={question.question}
                        onChange={(e) => onQuestionUpdate(questionIndex, e.target.value)}
                    />
                    {question.answers.map((answer, answerIndex) => (
                        <div key={answerIndex}>
                            <label className={styles.label} htmlFor={`answer-${questionIndex}-${answerIndex}`}>
                                {answerIndex === 0 ? "Correct Answer" : `Incorrect answer ${answerIndex}`}
                            </label>
                            <input
                                required
                                className={styles.input}
                                type="text"
                                id={`answer-${questionIndex}-${answerIndex}`}
                                value={answer.answer}
                                onChange={(e) => onAnswerUpdate(questionIndex, answerIndex, e.target.value)}
                            />
                        </div>
                    ))}
                </div>
            ))
            }
        </>
    )
}

export default QuestionDetailsInput;
import styles from './QuizDetailsInput.module.css'

const QuizDetailsInput: React.FC<{ quizTitle: string; updateQuizTitle: (title: string) => void; numberOfQuestions: number; questionChangeHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void }> = ({ quizTitle, updateQuizTitle, numberOfQuestions, questionChangeHandler }) => {
    return (
        <div className={styles.quizDetailsCard}>
            <div>
                <label className={styles.label} htmlFor="title">Quiz Title:</label>
                <input
                    required
                    className={styles.input}
                    type="text"
                    id="title"
                    value={quizTitle}
                    onChange={(e) => updateQuizTitle(e.target.value)}
                />
            </div>
            <div>
                <label className={styles.label} htmlFor="numberofquestions">Number of Questions:</label>
                <select
                    className={styles.input}
                    id="numberofquestions"
                    value={numberOfQuestions}
                    onChange={questionChangeHandler}
                >
                    {Array.from({ length: 10 }, (_, index) => (
                        <option key={index + 1} value={index + 1}>{index + 1}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default QuizDetailsInput;
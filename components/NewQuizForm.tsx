import styles from './NewQuizForm.module.css'

import { useRef, useState } from 'react'

type quizData = {
    title: string | undefined;
    questions: {
        question: string | undefined;
        answers: {
            answer: string | undefined;
        }[];
    }[];
}

const NewQuizForm: React.FC<{ onAddQuiz: (quizData: quizData) => void }> = ({ onAddQuiz }) => {
    const titleInputRef = useRef<HTMLInputElement>(null);
    const [numberOfQuestions, setNumberOfQuestions] = useState(1);
    const questionInputRefs: React.RefObject<HTMLInputElement>[] = Array.from(
        { length: 10 },
        () => useRef<HTMLInputElement>(null)
    );
    const answerInputRefs: React.RefObject<HTMLInputElement>[][] = Array.from(
        { length: 10 },
        () => Array.from({ length: 4 }, () => useRef<HTMLInputElement>(null))
    );

    const questionChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setNumberOfQuestions(+event.target.value);
    };

    const newQuizHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const quizTitle = titleInputRef.current?.value;
        let quizQuestions = [];
        for (let i = 0; i < numberOfQuestions; i++) {
            const question = questionInputRefs[i].current?.value;
            const answers = [];

            for (let j = 0; j < 4; j++) {
                const answer = answerInputRefs[i][j].current?.value;
                answers.push({ answer });
            }

            quizQuestions.push({
                question,
                answers,
            });
        }

        const quizData = {
            title: quizTitle,
            questions: quizQuestions,
        }
        onAddQuiz(quizData)
    };

    return (
        <>
            <h1 className={styles.newquiztitle}>Add a new quiz</h1>
            <div className={styles.quizform}>
                <form onSubmit={newQuizHandler}>
                    <div>
                        <label className={styles.label} htmlFor="title">Quiz Title: </label>
                        <input className={styles.input} type="text" id="title" ref={titleInputRef} />
                    </div>
                    <div>
                        <label className={styles.label} htmlFor="numberofquestions">Enter the number of questions:</label>
                        <select className={styles.input} id="numberofquestions" onChange={questionChangeHandler}>
                            {Array.from({ length: 10 }, (_, index) => (
                                <option key={index + 1} value={index + 1}>
                                    {index + 1}
                                </option>
                            ))}
                        </select>
                    </div>
                    {[...Array(numberOfQuestions)].map((_, questionIndex) => (
                        <div key={questionIndex}>
                            <label className={styles.label} htmlFor={`question${questionIndex + 1}`}>Question {questionIndex + 1}</label>
                            <input className={styles.input} ref={questionInputRefs[questionIndex]} type="text" id={`question${questionIndex + 1}`} />

                            {[...Array(4)].map((_, answerIndex) => (
                                <div key={answerIndex}>
                                    <label className={styles.label} htmlFor={`answer${questionIndex + 1}-${answerIndex + 1}`}>
                                        {answerIndex === 0 ? 'Correct Answer' : `Incorrect Answer:  ${answerIndex}`}
                                    </label>
                                    <input className={styles.input} ref={answerInputRefs[questionIndex][answerIndex]} type="text" id={`answer${questionIndex + 1}-${answerIndex + 1}`} />
                                </div>
                            ))}
                        </div>
                    ))}
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
                <h1>{numberOfQuestions}</h1>
            </div>
        </>
    );
};

export default NewQuizForm;
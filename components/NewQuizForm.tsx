
import styles from './NewQuizForm.module.css'

import { useRef, useState } from 'react'

import { motion } from 'framer-motion'

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

    const [isSubmitting, setIsSubmitting] = useState("Create Quiz")

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
                let answerArray = answers.map(answer => answer.answer)
            }

            quizQuestions.push({
                question,
                answers,
            });
        }

        const quizAnswers = quizQuestions.map(question =>
            question.answers.map(answer => answer.answer!.trim())
        );

        let hasDuplicates = quizAnswers.some(answers =>
            answers.some((answer, j) => answers.indexOf(answer) !== j)
        );

        console.log(hasDuplicates);

        if (hasDuplicates) {
            console.log("There are duplicate answers in the quiz!");
            hasDuplicates = false;
            return;
        }

        const quizData = {
            title: quizTitle,
            questions: quizQuestions,
        }

        setIsSubmitting("Creating quiz...")
        onAddQuiz(quizData)
    };

    return (
        <>
            <h1 className={styles.newquiztitle}>Add a new quiz</h1>
            <div className={styles.quizform}>
                <form onSubmit={newQuizHandler}>
                    <div>
                        <label className={styles.label} htmlFor="title">Quiz Title: </label>
                        <input required className={styles.input} type="text" id="title" ref={titleInputRef} />
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
                            <input required className={styles.input} ref={questionInputRefs[questionIndex]} type="text" id={`question${questionIndex + 1}`} />

                            {[...Array(4)].map((_, answerIndex) => (
                                <div key={answerIndex}>
                                    <label className={styles.label} htmlFor={`answer${questionIndex + 1}-${answerIndex + 1}`}>
                                        {answerIndex === 0 ? 'Correct Answer' : `Incorrect Answer:  ${answerIndex}`}
                                    </label>
                                    <input required className={styles.input} ref={answerInputRefs[questionIndex][answerIndex]} type="text" id={`answer${questionIndex + 1}-${answerIndex + 1}`} />
                                </div>
                            ))}
                        </div>
                    ))}
                    <motion.button whileHover={{ scale: 1.02 }} transition={{ type: 'spring', ease: "easeOut", duration: 0.2 }} className={styles.submitButton} type="submit">{isSubmitting}</motion.button>
                </form>
                <h1>{numberOfQuestions}</h1>
            </div>
        </>
    );
};

export default NewQuizForm;
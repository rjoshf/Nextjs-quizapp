
import styles from './NewQuizForm.module.css'

import { useRef, useState } from 'react'

import { motion } from 'framer-motion'
import Card from '../UI/Card';
import Error from '../UI/Error';

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

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [duplicateAnswers, setDuplicateAnswers] = useState(false)

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
        setDuplicateAnswers(false);
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

        const quizAnswers = quizQuestions.map(question =>
            question.answers.map(answer => answer.answer!.trim())
        );

        let hasDuplicates = quizAnswers.some(answers =>
            answers.some((answer, j) => answers.indexOf(answer) !== j)
        );

        if (hasDuplicates) {
            console.log("There are duplicate answers in the quiz!");
            hasDuplicates = false;
            setDuplicateAnswers(true)
            return;
        }

        const quizData = {
            title: quizTitle,
            questions: quizQuestions,
        }

        if (isSubmitting === true) {
            return;
        }

        setIsSubmitting(true)
        onAddQuiz(quizData)
    };

    return (
        <>
            <motion.section viewport={{ once: true, amount: 0.5 }} initial={{ opacity: 0.8, y: 5, scale: 0.99 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: 'tween', duration: 0.75 }} className={styles.newquiz}>
                <h1 className={styles.newquiztitle}>Add a new quiz</h1>
                <Card>
                    <form onSubmit={newQuizHandler}>
                        <div className={styles.quizDetailsCard}>
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
                        </div>
                        {[...Array(numberOfQuestions)].map((_, questionIndex) => (
                            <div key={questionIndex} className={styles.questionCard}>
                                <div>
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
                            </div>
                        ))}
                        {duplicateAnswers && <Error errorTitle="Error: duplicate answers!" errorMessage="All answers must be unique!"></Error>}
                        <motion.button whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 100 }} className={styles.submitButton} type="submit">{isSubmitting ? 'Creating Quiz...' : 'Create Quiz'}</motion.button>
                    </form>
                </Card>
            </motion.section>
        </>
    );
};

export default NewQuizForm;
import React, { useState } from 'react';
import styles from './NewQuizForm.module.css';
import Card from '../UI/Card';
import Error from '../UI/Error';

import { motion } from 'framer-motion'
import QuizDetailsInput from './QuizDetailsInput';
import QuestionDetailsInput from './QuestionDetailsInput';

type Answer = {
    answer: string;
};

type Question = {
    question: string;
    answers: Answer[];
};

type QuizData = {
    title: string;
    questions: Question[];
};

const NewQuizForm: React.FC<{ onAddQuiz: (quizData: QuizData) => void }> = ({ onAddQuiz }) => {
    const [quizTitle, setQuizTitle] = useState('');
    const [numberOfQuestions, setNumberOfQuestions] = useState(1);
    const [questions, setQuestions] = useState<Question[]>([
        { question: '', answers: Array(4).fill({ answer: '' }) },
    ]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [duplicateAnswers, setDuplicateAnswers] = useState(false);

    const updateQuizTitle = (title: string) => setQuizTitle(title)

    const questionChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newNumberOfQuestions = +event.target.value;
        setNumberOfQuestions(newNumberOfQuestions);

        const newQuestions = Array.from({ length: newNumberOfQuestions }, (_, index) => {
            return questions[index] || { question: '', answers: Array(4).fill({ answer: '' }) };
        });

        setQuestions(newQuestions);
    };

    const onQuestionUpdate = (index: number, questionText: string) => {
        const updatedQuestions = questions.map((q, qIndex) =>
            qIndex === index ? { ...q, question: questionText } : q
        );
        setQuestions(updatedQuestions);
    };

    const onAnswerUpdate = (questionIndex: number, answerIndex: number, answerText: string) => {
        const updatedQuestions = questions.map((q, qIndex) => {
            if (qIndex === questionIndex) {
                return {
                    ...q,
                    answers: q.answers.map((a, aIndex) =>
                        aIndex === answerIndex ? { ...a, answer: answerText } : a
                    ),
                };
            }
            return q;
        });

        setQuestions(updatedQuestions);
    };

    const newQuizHandler = (event: React.FormEvent) => {
        event.preventDefault();
        setDuplicateAnswers(false);

        const hasDuplicates = questions.some(question =>
            question.answers.some((answer, index, self) =>
                self.findIndex(a => a.answer === answer.answer) !== index
            )
        );

        if (hasDuplicates) {
            setDuplicateAnswers(true);
            return;
        }

        const quizData: QuizData = {
            title: quizTitle,
            questions,
        };

        if (!isSubmitting) {
            setIsSubmitting(true);
            onAddQuiz(quizData);
        }
    };

    return (
        <>
            <motion.section viewport={{ once: true, amount: 0.5 }} initial={{ opacity: 0.8, y: 5, scale: 0.99 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: 'tween', duration: 0.75 }} className={styles.newquiz}>
                <h1 className={styles.newquiztitle}>Add a new quiz</h1>
                <Card>
                    <form onSubmit={newQuizHandler}>
                        <QuizDetailsInput quizTitle={quizTitle} updateQuizTitle={updateQuizTitle} numberOfQuestions={numberOfQuestions} questionChangeHandler={questionChangeHandler} />
                        <QuestionDetailsInput questions={questions} onQuestionUpdate={onQuestionUpdate} onAnswerUpdate={onAnswerUpdate} />
                        {duplicateAnswers && <Error errorTitle="Error: Duplicate Answers!" errorMessage="All answers must be unique." />}
                        <motion.button whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 100 }} type="submit" className={styles.submitButton}>
                            {isSubmitting ? 'Creating Quiz...' : 'Create Quiz'}
                        </motion.button>
                    </form>
                </Card>
            </motion.section>
        </>
    );
};

export default NewQuizForm;
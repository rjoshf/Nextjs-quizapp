import { useState, useCallback, useEffect, useContext } from 'react';
import { QuizContext } from "@/app/context/store";
import Results from './Results';
import QuestionItem from './QuestionItem';

type quizzQuestions = {
    question: string;
    answers: {
        answer: string;
    }[];
}[];

export default function Question({ quizzQuestions }: { quizzQuestions: quizzQuestions }) {
    const { quizTimer } = useContext(QuizContext);

    //Initialising values for userAnswers and userScore states.
    const getLocalStorageItem = (key: string) => {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : null;
    };

    const [answerState, setAnswerState] = useState('')
    const [userScore, setUserScore] = useState<number>(getLocalStorageItem('userScore') || 0);
    const [userAnswers, setUserAnswers] = useState<string[]>(getLocalStorageItem('userAnswers') || []);

    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;

    const quizIsComplete = activeQuestionIndex === quizzQuestions.length;

    // Load userAnswers and userScore from localStorage on component mount
    useEffect(() => {

        const storedUserAnswers = localStorage.getItem('userAnswers');
        if (storedUserAnswers) {
            setUserAnswers(JSON.parse(storedUserAnswers));
        }
        const storedUserScore = localStorage.getItem('userScore');
        if (storedUserScore) {
            setUserScore(JSON.parse(storedUserScore));
        }
    }, []);

    // Save userAnswers to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
    }, [userAnswers]);

    // Save userScore to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('userScore', JSON.stringify(+userScore));
    }, [userScore])

    const answers = quizzQuestions[activeQuestionIndex]?.answers.map(answers => answers.answer)

    const handleSelectAnswer = (selectedAnswer: string) => {
        localStorage.setItem('remainingTime', String(quizTimer));
        setAnswerState('answered');
        setUserAnswers(prevState => [...prevState, selectedAnswer]);

        setTimeout(() => {
            if (selectedAnswer === answers[0]) {
                setAnswerState('correct');
                setUserScore(prevUserScore => prevUserScore + 1);
            } else {
                setAnswerState('wrong');
            }

            setTimeout(() => {
                setAnswerState('')
            }, 900)
        }, 900)
    }

    const handleSkipAnswer = useCallback(() => {
        setUserAnswers(prevState => [...prevState, "You ran out of time on this question!"])
        localStorage.setItem('remainingTime', String(quizTimer));
    }, []);

    return (
        <>
            {!quizIsComplete && <QuestionItem activeQuestionIndex={activeQuestionIndex} answerState={answerState} quizzQuestions={quizzQuestions} answers={answers} userAnswers={userAnswers} handleSkipAnswer={handleSkipAnswer} handleSelectAnswer={handleSelectAnswer}></QuestionItem>}
            {quizIsComplete && <Results quizzQuestions={quizzQuestions} userScore={userScore} userAnswers={userAnswers}></Results>}
        </>
    )
}

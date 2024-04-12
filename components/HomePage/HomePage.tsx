'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useState, useContext } from 'react';

import { QuizContext } from '@/app/context/store';

import InfoSection from './InfoSection';
import SocialSection from './SocialSection';
import QuizSection from './QuizSection';

type quizzes = { title: string; questions: { question: string; answers: { answer: string; }[]; }[]; id: string; }[]

export default function HomePage({ quizzes }: { quizzes: quizzes }) {
    const router = useRouter();

    const { updateQuizzes, updateQuizTimer } = useContext(QuizContext);

    const [hasQuizStarted, setHasQuizStarted] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [buttonText, setButtonText] = useState('Start Quiz')

    useEffect(() => {
        // Load quizzes into context
        updateQuizzes(quizzes);

        // Initialize state based on localStorage, ensuring this runs only on client side
        const hasQuizBeenSelected = localStorage.getItem('selectedQuiz');
        if (hasQuizBeenSelected) {
            setHasQuizStarted(true);
            setSelectedOption(JSON.parse(hasQuizBeenSelected));
        } else if (quizzes.length > 0) {
            setSelectedOption(quizzes[0].id); // default to the first quiz if none is selected
        }

        // Check if selectedQuiz exists in localStorage and update quiz timer accordingly
        const selectedQuizExists = localStorage.getItem('selectedQuiz');
        if (!selectedQuizExists) {
            updateQuizTimer(10000);
        }
    }, [quizzes]);

    const quizChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.currentTarget.value);
    }

    const timeChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        updateQuizTimer(+event.target.value * 1000);
    }

    function startQuiz(event: React.FormEvent) {
        event.preventDefault();
        setButtonText('Loading...')
        localStorage.setItem('selectedQuiz', JSON.stringify(selectedOption));
        router.push('/quiz/' + selectedOption);
    }

    return (
        <>
            <QuizSection
                hasQuizStarted={hasQuizStarted}
                quizzes={quizzes}
                startQuiz={startQuiz}
                quizChangeHandler={quizChangeHandler}
                timeChangeHandler={timeChangeHandler}
                buttonText={buttonText}
            />
            <InfoSection />
            <SocialSection />
        </>
    );
}
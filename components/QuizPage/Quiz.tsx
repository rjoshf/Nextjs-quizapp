'use client'

//component imports
import Question from './Question'
import Card from '../UI/Card';

import styles from './Quiz.module.css';
import QuizNotFound from './QuizNotFound';
import Header from './Header';

export default function Quiz({ params }: { params: { id: string } }) {

    //we reach out to local storage here so the data stays on page reload, otherwise whilst reloading the page shows quiz not found as selectedQuiz is undefined.
    const loadedQuizzesString = localStorage.getItem("loadedQuizzes");

    // Parse the string into an array of objects
    const loadedQuizzes = loadedQuizzesString ? JSON.parse(loadedQuizzesString) : [];

    // Check if selectedQuiz is defined before accessing its properties
    const selectedQuiz = loadedQuizzes.find((quiz: { id: string }) => quiz.id === params.id);

    if (!selectedQuiz) {
        return (
            <QuizNotFound />
        );
    }

    return (
        <>
            <Header title={selectedQuiz.title} />
            <main className={styles.quizSection}>
                <Card>
                    <Question quizzQuestions={selectedQuiz.questions}></Question>
                </Card>
            </main>
        </>
    )
}

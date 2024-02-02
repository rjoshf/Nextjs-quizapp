'use client'

import { useRef, useState } from 'react'

const NewQuizForm: React.FC<{}> = () => {
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
        console.log(titleInputRef.current?.value);
        for (let i = 0; i < numberOfQuestions; i++) {
            console.log(questionInputRefs[i].current?.value);

            for (let j = 0; j < 4; j++) {
                console.log(answerInputRefs[i][j].current?.value);
            }
        }
    };

    return (
        <div>
            <form onSubmit={newQuizHandler}>
                <div>
                    <label htmlFor="title">Quiz Title</label>
                    <input type="text" id="title" ref={titleInputRef} />
                </div>
                <div>
                    <label htmlFor="numberofquestions">Enter the number of questions:</label>
                    <select id="numberofquestions" onChange={questionChangeHandler}>
                        {Array.from({ length: 10 }, (_, index) => (
                            <option key={index + 1} value={index + 1}>
                                {index + 1}
                            </option>
                        ))}
                    </select>
                </div>
                {[...Array(numberOfQuestions)].map((_, questionIndex) => (
                    <div key={questionIndex}>
                        <label htmlFor={`question${questionIndex + 1}`}>Question {questionIndex + 1}</label>
                        <input ref={questionInputRefs[questionIndex]} type="text" id={`question${questionIndex + 1}`} />

                        {[...Array(4)].map((_, answerIndex) => (
                            <div key={answerIndex}>
                                <label htmlFor={`answer${questionIndex + 1}-${answerIndex + 1}`}>
                                    {answerIndex === 0 ? 'Correct Answer' : `Incorrect Answer:  ${answerIndex}`}
                                </label>
                                <input ref={answerInputRefs[questionIndex][answerIndex]} type="text" id={`answer${questionIndex + 1}-${answerIndex + 1}`} />
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
    );
};

export default NewQuizForm;
'use client'

import Link from "next/link";

import { useEffect, useState } from 'react'

const HomePage: React.FC<{}> = () => {

    const [startQuizText, setStartQuizText] = useState("Start Quiz")

    useEffect(() => {
        if (localStorage.getItem('userAnswers')) {
            setStartQuizText("Resume Quiz")
        }
    }, [])

    return (
        <>
            <h1>Home Page</h1>
            <Link href='/quiz'>{startQuizText}</Link>
        </>
    )

}

export default HomePage
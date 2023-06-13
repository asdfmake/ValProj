"use client"

import { auth } from '@/firebase/firebaseClient';
import { getTests, getUserData } from '@/firebase/userFunctions';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

const Quiz = () => {
  const [user, loading] = useAuthState(auth);
  const [userData, setUserData] = useState(Object)
  const [test, setTest] = useState<any>(null)

  useEffect(() => {
      if (user) {
          let load = async ()=>{
              let data = await getUserData(user.uid)
              setUserData(data)

              let tests = await getTests(data!)
              setTest(tests.find((nesto:any) => nesto.id == "test1"))
          }
          load()
          
      }
  }, [user]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<any>([]);

  if(test){
    console.log(test.data.pitanja)
    /* const questions = [
      {
        question: "What is the capital of France?",
        options: ["London", "Paris", "Berlin", "Rome"],
        answer: "Paris"
      },
      {
        question: "Which planet is known as the Red Planet?",
        options: ["kita", "kita", "kita", "kita"],
        answer: "kita"
      },
      {
          question: "Which planet is known as the Red Planet?",
          options: ["picka", "picka", "picka", "picka"],
          answer: "picka"
      },
      {
          question: "Which planet is known as the Red Planet?",
          options: ["nesto", "nesto", "nesto", "nesto"],
          answer: "nesto"
      },
      // Add more questions here
    ]; */
    const questions = test.data.pitanja;

    const handleAnswer = ( answer: string) => {
      setAnswers([...answers, answer]);
      console.log([...answers])
      setCurrentQuestion(currentQuestion + 1);
    }
    
    return (
      <div className="bg-base-100">
        {currentQuestion < questions.length ? (
          <div className="max-w-lg mx-auto text-center">
            <h1 className="text-lg font-medium mb-4 text-3xl">Pitanje {currentQuestion + 1}</h1>
            <p className="text-black-800 mb-4 text-xl">{questions[currentQuestion].pitanje}</p>
            <div className="space-y-2 flex flex-col">
              {questions[currentQuestion].opcije.map((option: any, index:number) => (
                <button
                  key={index}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md"
                  onClick={(e) => handleAnswer(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-4">Quiz Results</h1>
            <ul className="text-white-800">
              {questions.map((question: any, index: number) => (
                <li key={index} className="mb-2">
                  <strong>{question.question}</strong>
                  <br />
                  Your answer: {answers[index]}
                  <br />
                  Correct answer: {question.odgovor}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
  else{
    return "loading test"
  }
  

  
  
}

export default Quiz;

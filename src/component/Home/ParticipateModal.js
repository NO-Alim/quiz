import React, { useState } from 'react';
import close from '../../assets/images/close.png';
import { useGetQuestionsQuery } from '../../features/question/questionsApi';
import attention from '../../assets/images/attention.png';
import QuestionBody from './QuestionBody';

const ParticipateModal = ({ open, control, questions, item }) => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [questionsState, setQuestionsState] = useState(questions);
  const [result, setResult] = useState([]);

  const nextQuestion = () => {
    if (activeQuestion < questions.length - 1) {
      setActiveQuestion(activeQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (activeQuestion > 0) {
      setActiveQuestion(activeQuestion - 1);
    }
  };

  //when client click options add a value Selected:true and setInside questions
  const handleOptionClick = (questionId, question) => {
    const changedQuestion = questionsState.map((item) =>
      item.id === questionId ? { ...question } : { ...item }
    );
    setQuestionsState(changedQuestion);
  };

  const handleSubmit = (e) => {
    console.log(questionsState);
  };

  return (
    open && (
      <div className="fixed w-full md:p-5 min-h-screen inset-0 bg-brand/50 z-10 items-center justify-center overflow-y-scroll scrollbar-hide">
        <div className="bg-background rounded-md w-full min-h-full p-2">
          <div
            className="rounded-full bg-transparent flex items-center justify-end cursor-pointer"
            onClick={control}
          >
            <img className="w-4 h-4" src={close} alt="" />
          </div>
          <div className="flex flex-col gap-10 p-3">
            <div className="flex items-center gap-5">
              <img className="w-10" src={attention} alt="attention" />
              <h4 className="text-lg text-textPrimary/80">
                A Question can have multiple answers.
              </h4>
            </div>
            <span className="w-full border-b border-borderPrimary/60"></span>
            <div className="text-center">
              <h1 className="text-xl font-semibold">{item.name}</h1>
            </div>
            <QuestionBody
              question={questionsState[activeQuestion]}
              handleOptionClick={handleOptionClick}
            />
            <div className="flex justify-between">
              <button
                className="px-5 py-2 bg-brand/80 hover:bg-brand disabled:hover:bg-brand/80 text-background font-semibold rounded-md all disabled:cursor-no-drop"
                disabled={activeQuestion === 0}
                onClick={prevQuestion}
              >
                Previous Question
              </button>
              <button
                className={`px-5 py-2 bg-brand/80 hover:bg-brand disabled:hover:bg-brand/80 text-background font-semibold rounded-md all ${
                  activeQuestion === questions.length - 1 ? 'hidden' : null
                }`}
                disabled={activeQuestion === questions.length - 1}
                onClick={nextQuestion}
              >
                Next Question
              </button>
              <button
                className={`px-5 py-2 bg-brand/80 hover:bg-brand disabled:hover:bg-brand/80 text-background font-semibold rounded-md all ${
                  activeQuestion === questions.length - 1 ? null : 'hidden'
                }`}
                onClick={handleSubmit}
              >
                Submit Answer
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ParticipateModal;

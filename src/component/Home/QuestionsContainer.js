import React, { useState, useEffect } from 'react';
import attention from '../../assets/images/attention.png';
import QuestionBody from './QuestionBody';
import { useAddResultMutation } from '../../features/result/resultApi';
import { useSelector } from 'react-redux';
const QuestionsContainer = ({
  questions,
  item,
  handleLoading,
  handleErrorMessage,
}) => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [questionsState, setQuestionsState] = useState(questions);

  const { user } = useSelector((state) => state.auth);

  const [addResult, { isSuccess, isError, error, loading }] =
    useAddResultMutation();
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

  //...(delete item.selected && item)
  //when client click options add a value Selected:true and setInside questions
  const handleOptionClick = (questionId, question) => {
    const changedQuestion = questionsState.map((item) =>
      item.id === questionId ? question : { ...item }
    );
    setQuestionsState(changedQuestion);
  };

  const handleSubmit = (e) => {
    //addResult({ data: questionsState });
    questionsState.map((item) => {
      addResult({
        data: {
          userId: user.id,
          questionId: item.id,
          moduleId: item.moduleId,
          code: item.code,
          description: item.description,
          options: item.options,
        },
      });
    });
  };

  useEffect(() => {
    handleLoading(loading);
  }, [loading]);

  useEffect(() => {
    if (isError) {
      handleErrorMessage(error?.data);
    }
  }, [error]);

  return (
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
  );
};

export default QuestionsContainer;

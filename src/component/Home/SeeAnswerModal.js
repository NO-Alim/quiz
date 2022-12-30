import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import close from '../../assets/images/close.png';
import { useGetAnswersQuery } from '../../features/answers/answersApi';
import { useGetResultQuery } from '../../features/result/resultApi';
import { result } from '../../utils/resultCalculation';
import Error from '../ui/Error';
import LoaderSpin from '../ui/LoaderSpin';
import ProgressRounded from '../ui/ProgressRounded';
import SingleAnswerBody from './SingleAnswerBody';
const SeeAnswerModal = ({ open, control, item }) => {
  const { user } = useSelector((state) => state.auth);
  const { id } = user;

  const [activeAnswer, setActiveAnswer] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  //Result(user submited Result)
  const {
    data: resultData,
    resultLoading,
    isResultError,
    resultError,
  } = useGetResultQuery({
    userId: id,
    moduleId: item.id,
  });

  //Answers
  const {
    data: answersData,
    answerLoading,
    isAnswerError,
    answerError,
  } = useGetAnswersQuery(item.id);

  const nextAnswer = () => {
    if (activeAnswer < answersData.length - 1) {
      setActiveAnswer(activeAnswer + 1);
    }
  };

  const prevAnswer = () => {
    if (activeAnswer > 0) {
      setActiveAnswer(activeAnswer - 1);
    }
  };

  useEffect(() => {
    if (answerLoading === true && resultLoading === true) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [answerLoading, resultLoading]);

  useEffect(() => {
    if (isResultError && isAnswerError) {
      setError(`${resultError?.data} && ${answerError.data}`);
    }
    if (isAnswerError && !isResultError) {
      setError(answerError?.data);
    }
    if (isResultError && !isAnswerError) {
      setError(resultError?.data);
    }
  }, [isAnswerError, isResultError, answerError, resultError]);

  let content;

  if (loading) {
    content = (
      <div className="flex-1 flex items-center justify-center">
        <LoaderSpin />
      </div>
    );
  }

  if (!loading && error !== '') {
    content = (
      <div className="flex-1 flex items-center justify-center">
        <Error message={error} />
      </div>
    );
  }

  if (!loading && !error && answersData && resultData) {
    const point = result(answersData, resultData);
    content = (
      <div className="flex flex-col gap-5 p-3">
        <div className="flex gap-5 justify-between items-center">
          <div className="">
            <h1 className="text-xl ">{item.name}</h1>
            <h1 className="">
              Score: {point.point}/{answersData?.length * 5}
            </h1>
          </div>
          <div>
            <ProgressRounded percentage={point.percentage} />
          </div>
        </div>
        <span className="border-b border-brand/20"></span>
        <div className="space-y-10">
          <SingleAnswerBody
            answer={answersData[activeAnswer]}
            results={resultData}
          />
          <div className="flex justify-between">
            <button
              className={`px-5 py-2 bg-brand/80 text-background hover:bg-brand disabled:opacity-50  font-semibold rounded-md all disabled:cursor-no-drop 
           `}
              disabled={activeAnswer === 0}
              onClick={prevAnswer}
            >
              Previous Answer
            </button>
            <button
              className={`px-5 py-2 bg-brand/80 hover:bg-brand disabled:opacity-50 text-background font-semibold rounded-md all disabled:cursor-no-drop`}
              disabled={activeAnswer === answersData.length - 1}
              onClick={nextAnswer}
            >
              Next Answer
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    open && (
      <div className="fixed w-full md:p-5  inset-0 bg-brand/50 z-10 cursor-pointer items-center justify-center overflow-y-scroll scrollbar-hide">
        <div className="bg-background rounded-md w-full min-h-full p-2 flex flex-col">
          <div
            className="rounded-full bg-transparent flex items-center justify-end cursor-pointer"
            onClick={control}
          >
            <img className="w-4 h-4" src={close} alt="" />
          </div>
          {content}
        </div>
      </div>
    )
  );
};

export default SeeAnswerModal;

import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetResultQuery } from '../../features/result/resultApi';
import Error from '../ui/Error';
import done from '../../assets/images/done.png';
import { useGetQuestionsQuery } from '../../features/question/questionsApi';
import SeeAnswerModal from './SeeAnswerModal';
import ParticipateModal from './ParticipateModal';
import { result } from '../../utils/resultCalculation';
import { useGetAnswersQuery } from '../../features/answers/answersApi';
import { setPoint } from '../../features/rannking/rankingSlice';

const SingleModule = ({ item }) => {
  const { user } = useSelector((state) => state.auth);
  const { id } = user;
  const { moduleId } = useSelector((state) => state.ranking);
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const controlModal = () => {
    setOpenModal(!openModal);
  };

  const handleDispatch = (obj) => {
    if (!moduleId.includes(obj.moduleId)) {
      dispatch(setPoint(obj));
    }
  };

  //fetch Module answer, if there is answer conditionally render view answer or Participate
  const {
    data: resultData,
    isLoading: resultIsLoading,
    isError: isResultError,
    error: resultError,
  } = useGetResultQuery({
    userId: id,
    moduleId: item.id,
  });

  //fetch question
  const {
    data: questionsData,
    isLoading: questionsLoading,
    isError: isQuestionsError,
    error: questionsError,
  } = useGetQuestionsQuery(item.id) || {};

  //fetch answer
  const {
    data: answersData,
    isLoading: answerLoading,
    isError: isAnswerError,
  } = useGetAnswersQuery(item.id);

  let content;

  if (
    (isQuestionsError || isResultError) &&
    (resultError || questionsError) &&
    isAnswerError
  ) {
    content = <Error message="something wrong in module data" />;
  }

  if (
    !questionsLoading &&
    !resultIsLoading &&
    !isQuestionsError &&
    resultData?.length === 0 &&
    questionsData?.length > 0
  ) {
    content = (
      <>
        <div className="bg-brand/10 p-2 rounded-md flex flex-col cursor-pointer">
          <div className="flex flex-col justify-between items-start">
            <h1 className="text-lg mb-3">{item.name}</h1>
            <h1 className="text-sm text-textPrimary/70">
              Author : <span className="capitalize">{item.authorName}</span>
            </h1>
            <h1 className="text-sm">Total Question: {questionsData.length}</h1>
            <h1 className="text-sm">
              Participate: {resultData?.length} of {questionsData?.length}
            </h1>
            <button
              className="w-full text-center py-2 rounded-md bg-brand text-background font-semibold mt-5"
              onClick={controlModal}
            >
              Participate
            </button>
          </div>
        </div>
        <ParticipateModal
          open={openModal}
          control={controlModal}
          questions={questionsData}
          item={item}
        />
      </>
    );
  }

  //if this module have answer for this user See Answer
  if (
    !resultIsLoading &&
    !isResultError &&
    !answerLoading &&
    !isAnswerError &&
    answersData?.length > 0 &&
    resultData?.length > 0
  ) {
    const earningPoint = result(answersData, resultData);
    content = (
      <>
        <div
          className="bg-brand/10 p-2 flex flex-col rounded-md cursor-pointer"
          onLoad={() =>
            handleDispatch({ point: earningPoint.point, moduleId: item.id })
          }
        >
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-[#1e871c] rounded-full flex items-center justify-center">
                <img src={done} alt="done" className="w-4" />
              </div>
              <h1>{item.name}</h1>
            </div>
          </div>
          <div>
            <h1 className="text-sm text-textPrimary/70">
              Author : <span className="capitalize">{item.authorName}</span>
            </h1>
            <h1 className="text-sm">
              Score: {earningPoint?.point} / {questionsData?.length * 5}
            </h1>
            <h1 className="text-sm">
              Participate: {resultData?.length} of {questionsData?.length}
            </h1>
            <button
              className="w-full text-center py-2 rounded-md bg-brand text-background font-semibold mt-5"
              onClick={controlModal}
            >
              See Answer
            </button>
          </div>
        </div>
        <SeeAnswerModal open={openModal} control={controlModal} item={item} />
      </>
    );
  }
  return <>{content}</>;
};

export default SingleModule;

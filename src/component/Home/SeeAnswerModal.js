import React from 'react';
import { useSelector } from 'react-redux';
import close from '../../assets/images/close.png';
import { useGetAnswersQuery } from '../../features/answers/answersApi';
import { useGetResultQuery } from '../../features/result/resultApi';
import SingleAnswerBody from './SingleAnswerBody';
const SeeAnswerModal = ({ open, control, item }) => {
  const { user } = useSelector((state) => state.auth);
  const { id } = user;

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
  return (
    open && (
      <div className="fixed w-full md:p-5 min-h-screen inset-0 bg-brand/50 z-10 cursor-pointer items-center justify-center overflow-y-scroll scrollbar-hide">
        <div className="bg-background rounded-md w-full min-h-full p-2">
          <div
            className="rounded-full bg-transparent flex items-center justify-end cursor-pointer"
            onClick={control}
          >
            <img className="w-4 h-4" src={close} alt="" />
          </div>
          <div className="flex flex-col gap-5 p-3">
            <div className="flex gap-5 justify-between items-center">
              <div className="">
                <h1 className="text-xl ">{item.name}</h1>
                <h1 className="">Score: 10/20</h1>
              </div>
              <div>
                <div className="h-20 w-20 rounded-full bg-brand/10 flex items-center justify-center">
                  100%
                </div>
              </div>
            </div>
            <span className="border-b border-brand/20"></span>
            <div>
              {answersData.map((item, ind) => {
                const thisItemResult = resultData.filter(
                  (resItem) => resItem.questionId === item.id
                );
                return (
                  <SingleAnswerBody
                    answer={item}
                    result={thisItemResult}
                    key={item.id}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default SeeAnswerModal;

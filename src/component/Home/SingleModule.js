import React from 'react';
import { useSelector } from 'react-redux';
import { useGetResultQuery } from '../../features/result/resultApi';
import Error from '../ui/Error';
import LoaderSpin from '../ui/LoaderSpin';
import done from '../../assets/images/done.png';
import { useGetQuestionsQuery } from '../../features/question/questionsApi';

const SingleModule = ({ item }) => {
  const { user } = useSelector((state) => state.auth);
  const { id } = user;

  //fetch Module answer, if there is answer condationaly render view answer and Particepate

  const {
    data: resultData,
    isLoading,
    isError,
    error,
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

  let content;

  if (!isLoading && isError) {
    content = <Error message={error.data} />;
  }

  if (
    !isLoading &&
    !isError &&
    resultData.length === 0 &&
    questionsData?.length > 0
  ) {
    content = (
      <div className="bg-brand/10 p-2 rounded-md flex flex-col cursor-pointer">
        <div className="flex flex-col justify-between items-start">
          <h1 className="text-lg mb-3">{item.name}</h1>
          <h1 className="text-sm text-textPrimary/70">
            Author : <span className="capitalize">{item.authorName}</span>
          </h1>
          <h1 className="text-sm">Total Question: {questionsData.length}</h1>
          <button className="w-full text-center py-2 rounded-md bg-brand text-background font-semibold mt-5">
            Participate
          </button>
        </div>
      </div>
    );
  }

  //if this module have answer for this user
  if (!isLoading && !isError && resultData?.length > 0) {
    content = (
      <>
        <div className="bg-brand/10 p-2 flex flex-col rounded-md cursor-pointer">
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
            <h1 className="text-sm">Score: 0 / {questionsData?.length * 5}</h1>
            <button className="w-full text-center py-2 rounded-md bg-brand text-background font-semibold mt-5">
              See Answer
            </button>
          </div>
        </div>
      </>
    );
  }
  return <>{content}</>;
};

export default SingleModule;

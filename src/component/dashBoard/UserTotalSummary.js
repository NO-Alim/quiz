import React from 'react';
import { useSelector } from 'react-redux';
import { useGetRankingQuery } from '../../features/rannking/rankingApi';
import { useGetUserAllResultQuery } from '../../features/result/resultApi';
import Error from '../ui/Error';
import LoaderSpin from '../ui/LoaderSpin';
import ProgressRounded from '../ui/ProgressRounded';

const UserTotalSummary = () => {
  const { user } = useSelector((state) => state.auth);
  const { id: uId, name: userName } = user;

  //result
  const {
    data: resultData,
    isLoading: resultLoading,
    isError: isResultError,
    error: resultError,
  } = useGetUserAllResultQuery(uId) || {};

  const {
    data: rankingData,
    isLoading: rankingLoading,
    isError: isRankingError,
    error: rankingError,
  } = useGetRankingQuery({ limit: '', userId: uId }) || {};
  let content;

  if (resultLoading) {
    content = (
      <div className="">
        <LoaderSpin />
      </div>
    );
  }

  if (!resultLoading && isResultError) {
    content = <Error message={resultError.data} />;
  }

  if (!resultLoading && !isResultError) {
    content = (
      <div className="flex justify-between items-center gap-5">
        <div className="flex gap-5">
          <div className="text-xl font-thin flex flex-col gap-2 justify-between">
            <h1>Participate Quiz</h1>
            <h1>Correct Answer</h1>
            <h1>Earn Point</h1>
          </div>
          <div className="text-sm flex flex-col gap-2 justify-between">
            <p className="bg-brand text-background px-2 rounded-md text-center">
              {resultData?.length}
            </p>
            <p className="bg-brand text-background px-2 rounded-md text-center">
              {rankingData?.length > 0 ? rankingData[0].point / 5 : 0}
            </p>
            <p className="bg-brand text-background px-2 rounded-md text-center">
              {rankingData?.length > 0 ? rankingData[0].point : 0}
            </p>
          </div>
        </div>
        <ProgressRounded
          percentage={
            rankingData?.length > 0
              ? Math.round(
                  (rankingData[0].point / (resultData.length * 5)) * 100
                )
              : 0
          }
        />
      </div>
    );
  }
  return <>{content}</>;
};

export default UserTotalSummary;

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Tbody from '../component/ranking/Tbody';
import Thead from '../component/ranking/Thead';
import Error from '../component/ui/Error';
import LoaderSpin from '../component/ui/LoaderSpin';
import {
  useGetMyRankingQuery,
  useGetRankingQuery,
} from '../features/rannking/rankingApi';

const Ranking = () => {
  const { user } = useSelector((state) => state.auth);
  const { id: uId } = user;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  //get ranking point this user
  const {
    data: myRankingResponse,
    isLoading: userRankingLoading,
    isError: isUserRankingError,
    error: userRankingError,
  } = useGetMyRankingQuery({ userId: uId });

  const { myIndex, data: userRanking } = myRankingResponse || {};

  //get 20 common asc limit ranking
  const {
    data: topTwenty,
    isLoading: topTwentyLoading,
    isError: isTopTwentyError,
    error: topTwentyError,
  } = useGetRankingQuery({ limit: 20, userId: '' });

  useEffect(() => {
    if (isUserRankingError || isTopTwentyError) {
      if (isUserRankingError) {
        setError(userRankingError?.data);
      }
      if (isTopTwentyError) {
        setError(topTwentyError?.data);
      }
    } else {
      setError('');
    }
  }, [
    userRankingLoading,
    topTwentyLoading,
    isUserRankingError,
    isTopTwentyError,
  ]);

  useEffect(() => {
    if (userRankingLoading || topTwentyLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [userRankingLoading, topTwentyLoading]);

  let content;

  if (loading) {
    content = (
      <div className="">
        <LoaderSpin />
      </div>
    );
  }

  if (!loading && error) {
    content = <Error message={error.data} />;
  }

  if (!loading && !error && topTwenty?.length > 0) {
    content = (
      <div className="bg-brand/10 p-5 rounded-md space-y-10">
        {userRanking?.length > 0 ? (
          <div className="space-y-3">
            <h1 className="text-xl font-semibold">Your Rank</h1>
            <hr className="border border-brand/10" />
            <table className="w-full border border-brand/10 py-3">
              <Thead />
              {userRanking.map((item) => {
                return <Tbody item={item} ind={myIndex} key={item.id} />;
              })}
            </table>
          </div>
        ) : null}
        <div className="space-y-3">
          <h1 className="text-xl font-semibold">Leader Board</h1>
          <hr className="border border-brand/10" />

          <table className="w-full border border-brand/10 py-3">
            <Thead />
            {topTwenty.map((item, ind) => {
              return <Tbody item={item} ind={ind} key={item.id} />;
            })}
          </table>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="section bg-background text-textPrimary ">{content}</div>
    </div>
  );
};

export default Ranking;

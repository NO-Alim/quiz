import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetRankingQuery } from '../features/rannking/rankingApi';
import {
  useGetResultQuery,
  useGetUserAllResultQuery,
} from '../features/result/resultApi';
import { uniqArray } from '../utils/uniqArray';
import Navbar from '../component/global/Navbar';
import LoaderSpin from '../component/ui/LoaderSpin';
import Error from '../component/ui/Error';
import Thead from '../component/ranking/Thead';
import Tbody from '../component/ranking/Tbody';

const Ranking = () => {
  const { user } = useSelector((state) => state.auth);
  const { id: uId } = user;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  //get ranking point this user
  const {
    data: userRanking,
    loading: userRankingLoading,
    isError: isUserRankingError,
    error: userRankingError,
  } = useGetRankingQuery({ limit: '', userId: uId });

  //get 20 common asc limit ranking
  const {
    data: topTwenty,
    loading: topTwentyLoading,
    isError: isTopTwentyError,
    error: topTwentyError,
  } = useGetRankingQuery({ limit: 20, userId: '' });

  useEffect(() => {
    if (userRankingLoading || topTwentyLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }

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
              {userRanking.map((item, ind) => {
                return <Tbody item={item} ind={100} />;
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
              return <Tbody item={item} ind={ind} />;
            })}
          </table>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="section bg-background text-textPrimary min-h-screen">
        {content}
      </div>
    </div>
  );
};

export default Ranking;

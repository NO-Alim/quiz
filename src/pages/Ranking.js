import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetRankingQuery } from '../features/rannking/rankingApi';
import {
  useGetResultQuery,
  useGetUserAllResultQuery,
} from '../features/result/resultApi';
import { uniqArray } from '../utils/uniqArray';

const Ranking = () => {
  const { user } = useSelector((state) => state.auth);
  const { id: uId } = user;

  //get ranking point this user
  const {
    data: userRanking,
    loading: userRankingLoading,
    isError: isUserRankingError,
    error: userRankignError,
  } = useGetRankingQuery({ limit: '', userId: uId });

  //all submited result this user

  const {
    data: userResult,
    loading: userResultLoading,
    isError: isUserResultError,
    error: userResultError,
  } = useGetUserAllResultQuery(uId);
  //uniq result Module Id
  const ModuleId = uniqArray(userResult, 'moduleId');

  //map module and get answers arr && count point

  //useEffect. if user haven't ranking call add ranking, if user have ranking check current point and ranking point if not same call editRanking

  //get 20 common asc limit ranking

  return <div>Ranking</div>;
};

export default Ranking;

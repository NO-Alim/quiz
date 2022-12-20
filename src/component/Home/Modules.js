import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetModulesQuery } from '../../features/module/moduleApi';
import {
  useAddRankingMutation,
  useEditRankingMutation,
  useGetRankingQuery,
} from '../../features/rannking/rankingApi';
import { uniqArray } from '../../utils/uniqArray';
import Error from '../ui/Error';
import LoaderSpin from '../ui/LoaderSpin';
import SingleModule from './SingleModule';

const Modules = () => {
  const { user } = useSelector((state) => state.auth);
  const { id: uId, name: userName } = user;
  //module data
  const { data, isLoading, isError, error } = useGetModulesQuery() || {};
  //ranking data
  const {
    data: rankingData,
    isLoading: rankingDataLoading,
    isError: isRankingError,
    error: rankingError,
  } = useGetRankingQuery({ limit: '', userId: uId }) || {};

  //addRanking
  const [
    addRanking,
    {
      isSuccess: isAddRankingSuccess,
      isError: isAddRankingError,
      error: addRankingError,
      loading: addRankingLoading,
    },
  ] = useAddRankingMutation();

  //editRanking

  const [
    editRanking,
    {
      isSuccess: isEditRankingSuccess,
      isError: isEditRankingError,
      error: editRankingError,
      loading: editRankingLoading,
    },
  ] = useEditRankingMutation();

  //local state
  const [pointArr, setPointArr] = useState([]);

  //this function pass to children and fill pointArr all complete module earning point.
  const handlePoint = (e) => {
    let x = [];
    x = (current) => [...current, e];
    setPointArr(x);
  };

  useEffect(() => {
    if (pointArr.length > 0) {
      const uniqPointArr = uniqArray(pointArr, 'id');
      const totalPoint = uniqPointArr
        .map((item) => item.point)
        .reduce((prev, next) => prev + next);
      //add ranking
      if (
        rankingData?.length === 0 &&
        !rankingDataLoading &&
        !isRankingError &&
        !addRankingLoading
      ) {
        console.log(`added`);
        //ranking post req
        addRanking({
          data: {
            userId: uId,
            userName: userName,
            point: totalPoint ? totalPoint : 0,
          },
        });
      }

      if (
        rankingData.length > 0 &&
        rankingData[0].point !== totalPoint &&
        !rankingDataLoading &&
        !isRankingError
      ) {
        //ranking edit req
        console.log(`edited`);
        editRanking({
          id: rankingData[0].id,
          data: { userId: uId, userName: userName, point: totalPoint },
        });
      }
    }
  }, [pointArr]);

  let content;

  if (isLoading) {
    content = (
      <div className="">
        <LoaderSpin />
      </div>
    );
  }

  if (!isLoading && isError) {
    content = <Error message={error.data} />;
  }

  if (!isLoading && !isError && data.length === 0) {
    content = <h2>Module List is Empty</h2>;
  }
  if (!isLoading && !isError && data.length > 0) {
    content = (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {data.map((item) => (
          <SingleModule key={item.id} item={item} handlePoint={handlePoint} />
        ))}
      </div>
    );
  }
  return <>{content}</>;
};

export default Modules;

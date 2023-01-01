import React from 'react';
import { useSelector } from 'react-redux';
import { useGetModulesQuery } from '../../features/module/moduleApi';
import {
  useAddRankingMutation,
  useEditRankingMutation,
  useGetRankingQuery,
} from '../../features/rannking/rankingApi';
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
          <SingleModule key={item.id} item={item} />
        ))}
      </div>
    );
  }
  return <>{content}</>;
};

export default Modules;

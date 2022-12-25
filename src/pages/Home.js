import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../component/global/Navbar';
import Modules from '../component/Home/Modules';
import {
  useAddRankingMutation,
  useEditRankingMutation,
  useGetRankingQuery,
} from '../features/rannking/rankingApi';

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const { id: uId, name: userName } = user || {};
  const { point, moduleId } = useSelector((state) => state.ranking);

  const {
    data: rankingData,
    isLoading: rankingLoading,
    isError: isRankingError,
    error: rankingError,
  } = useGetRankingQuery({ limit: '', userId: uId }) || {};

  const [
    addRanking,
    {
      loading: addLoading,
      isSuccess: addSuccess,
      isError: isAddError,
      error: addError,
    },
  ] = useAddRankingMutation();
  const [
    editRanking,
    {
      loading: editLoading,
      isSuccess: editSuccess,
      isError: isEditError,
      error: editError,
    },
  ] = useEditRankingMutation();

  useEffect(() => {
    if (!rankingLoading && !isRankingError) {
      //settimeout
      const timeOut = window.setTimeout(() => {
        if (moduleId.length > 0) {
          if (rankingData.length === 0) {
            //add
            addRanking({
              data: {
                userId: uId,
                point: point,
                userName,
              },
            });
          } else if (rankingData[0].point !== point) {
            //edit
            editRanking({
              id: rankingData[0].id,
              data: {
                userId: uId,
                point: point,
                userName,
              },
            });
          } else {
            //nothing to do
          }
        }
      }, 2000);

      return () => window.clearInterval(timeOut);
    }
  }, [isRankingError, rankingLoading, moduleId, rankingData, point]);

  return (
    <>
      <Navbar />
      <div className="section bg-background text-textPrimary min-h-screen">
        <div className="">
          <Modules />
        </div>
      </div>
    </>
  );
};

export default Home;

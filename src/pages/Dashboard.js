import React from 'react';
import DashBoardSummary from '../component/dashBoard/DashBoardSummary';
import PassFailedBoard from '../component/dashBoard/PassFailedBoard';
import ShareSocial from '../component/dashBoard/ShareSocial';
import UserTotalSummary from '../component/dashBoard/UserTotalSummary';
import Error from '../component/ui/Error';
import LoaderSpin from '../component/ui/LoaderSpin';
import { useGetModulesQuery } from '../features/module/moduleApi';

const Dashboard = () => {
  //all Result
  const { data, isLoading, isError, error } = useGetModulesQuery() || {};

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

  if (!isLoading && !isError && data?.length > 0) {
    content = (
      <div className="flex flex-col gap-5">
        <DashBoardSummary />
        <div className="flex flex-col gap-10">
          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex-1 bg-brand/10 rounded-md p-5">
              <UserTotalSummary />
            </div>
            <div className="bg-brand/10 rounded-md p-5 flex gap-3 flex-wrap items-center justify-center flex-1">
              {data.map((item) => (
                <PassFailedBoard item={item} key={item.id} />
              ))}
            </div>
          </div>
          <div>
            <ShareSocial />
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="section bg-background text-textPrimary ">{content}</div>
    </>
  );
};

export default Dashboard;

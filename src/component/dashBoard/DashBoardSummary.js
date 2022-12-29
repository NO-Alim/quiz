import React from 'react';
import { useSelector } from 'react-redux';

const DashBoardSummary = () => {
  const { user } = useSelector((state) => state.auth);
  const { name } = user;
  return (
    <div className="bg-brand/10 rounded-md p-5 flex flex-col sm:flex-row justify-around gap-10 items-center gap-3">
      <h1 className="text-2xl font-semibold text-center capitalize">{name}</h1>
      <div className="flex flex-col gap-3">
        <div>
          <h1 className="text-xl font-thin">
            Contribute Module :{' '}
            <span className="bg-brand text-sm text-background px-2 rounded-md text-center">
              0
            </span>
          </h1>
        </div>
        <div>
          <h1 className="text-xl font-thin">
            Contribute Question :{' '}
            <span className="bg-brand text-sm text-background px-2 rounded-md text-center">
              0
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default DashBoardSummary;

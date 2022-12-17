import React, { useEffect, useState } from 'react';
import { useGetModulesQuery } from '../../features/module/moduleApi';
import Error from '../ui/Error';
import LoaderSpin from '../ui/LoaderSpin';
import SingleModule from './SingleModule';

const Modules = () => {
  const { data, isLoading, isError, error } = useGetModulesQuery() || {};
  let content;
  const [totalPoint, setTotalPoint] = useState(0);

  const handlePoint = (e) => {
    setTotalPoint(totalPoint + e);
  };

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

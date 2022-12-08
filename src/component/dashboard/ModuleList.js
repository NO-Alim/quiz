import React from 'react';
import { useSelector } from 'react-redux';
import { useGetModulesQuery } from '../../features/module/moduleApi';
import Error from '../ui/Error';
import LoaderSpin from '../ui/LoaderSpin';
import ModuleBody from './ModuleBody';

const ModuleList = () => {
  const { user } = useSelector((state) => state.auth);
  const { email } = user;

  const { data, isLoading, isError, error } = useGetModulesQuery(email) || {};

  let content;

  if (isLoading) {
    content = <LoaderSpin />;
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
          <ModuleBody item={item} key={item.id} />
        ))}
      </div>
    );
  }
  return <>{content}</>;
};

export default ModuleList;

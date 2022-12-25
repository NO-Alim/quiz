import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetAnswersQuery } from '../../features/answers/answersApi';
import { useGetResultQuery } from '../../features/result/resultApi';
import { result } from '../../utils/resultCalculation';

const PassFailedBoard = ({ item }) => {
  const { user } = useSelector((state) => state.auth);
  const { id: uId, name: userName } = user;
  const { id: moduleId } = item || {};
  //local state
  const [color, setColor] = useState('#ccc');
  const [point, setPoint] = useState();
  //answers
  const {
    data: answersData,
    isLoading: answersLoading,
    isError: isAnswersError,
    error: answersError,
  } = useGetAnswersQuery(moduleId) || {};
  //result
  const {
    data: resultData,
    isLoading: resultLoading,
    isError: isResultError,
    error: resultError,
  } = useGetResultQuery({ userId: uId, moduleId: moduleId }) || {};

  useEffect(() => {
    if (resultData?.length > 0 && answersData?.length > 0) {
      let res = result(answersData, resultData);
      setPoint(res);
      if (res?.percentage > 69) {
        setColor('green');
      } else {
        setColor('red');
      }
    }
  }, [answersData, resultData]);

  let content;
  if (answersData?.length > 0) {
    content = (
      <div
        className={`w-3 h-3 rounded-sm relative cursor-pointer group`}
        style={{ background: `${color}` }}
      >
        {point && (
          <div className="absolute w-40 h-20 flex flex-col items-start justify-center p-3 rounded-md border border-borderPrimary/10 bg-background -left-20 -top-20 -z-0 scale-0 group-hover:scale-100 all">
            <h1>Total Point: {answersData.length * 5}</h1>
            <h1>Earning Point: {point.point}</h1>
          </div>
        )}
      </div>
    );
  }
  return <>{content}</>;
};

export default PassFailedBoard;

import React from 'react';
import { useSelector } from 'react-redux';

const Tbody = ({ item, ind }) => {
  const { user } = useSelector((state) => state.auth);
  const { id: uId } = user;
  return (
    <tbody className="text-center text-brand">
      <tr className="grid grid-cols-5">
        <td
          className={`col-span-1 border ${
            item.userId === uId ? 'border-brand' : 'border-brand/10'
          } py-2`}
        >
          <div>{ind + 1}</div>
        </td>
        <td
          className={`col-span-3 border ${
            item.userId === uId ? 'border-brand' : 'border-brand/10'
          } py-2`}
        >
          <div>{item.userName}</div>
        </td>
        <td
          className={`col-span-1 border ${
            item.userId === uId ? 'border-brand' : 'border-brand/10'
          } py-2`}
        >
          <div>{item.point}</div>
        </td>
      </tr>
    </tbody>
  );
};

export default Tbody;

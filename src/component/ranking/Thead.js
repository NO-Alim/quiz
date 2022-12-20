import React from 'react';

const Thead = () => {
  return (
    <thead>
      <tr className="grid grid-cols-5">
        <th className="col-span-1 border border-brand/10 py-3">Rank</th>
        <th className="col-span-3 border border-brand/10 py-3">Name</th>
        <th className="col-span-1 border border-brand/10 py-3">Point</th>
      </tr>
    </thead>
  );
};

export default Thead;

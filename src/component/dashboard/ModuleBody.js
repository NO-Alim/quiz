import React, { useState } from 'react';
import plus from '../../assets/images/plus.png';
import AddQuizModal from './AddQuizModal';

const ModuleBody = ({ item }) => {
  const [openAddQuizModal, setOpenAddQuizModal] = useState(false);
  const controlQuizModal = () => {
    setOpenAddQuizModal(!openAddQuizModal);
  };
  return (
    <>
      <div className="bg-background p-3 rounded-md flex items-center justify-between">
        <h1>{item.name}</h1>
        <div className="">
          <img
            className="w-6 h-6 cursor-pointer"
            src={plus}
            alt=""
            onClick={controlQuizModal}
          />
        </div>
      </div>
      <AddQuizModal
        open={openAddQuizModal}
        control={controlQuizModal}
        module={item.id}
      />
    </>
  );
};

export default ModuleBody;

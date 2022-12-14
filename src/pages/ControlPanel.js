import React, { useState } from 'react';
import AddModuleModal from '../component/controlPanel/AddModuleModal';
import ModuleList from '../component/controlPanel/ModuleList';

const ControlPanel = () => {
  const [openAddModuleModal, setOpenAddModuleModal] = useState(false);

  const controlModuleModal = () => {
    setOpenAddModuleModal(!openAddModuleModal);
  };

  //

  return (
    <>
      <div className="section bg-background text-textPrimary ">
        <div className="text-end mb-5">
          <button
            className="px-5 py-2 rounded-md bg-brand/20"
            onClick={controlModuleModal}
          >
            Add Module
          </button>
        </div>
        <div className="bg-brand/10 rounded-md p-5">
          <ModuleList />
          {/* <button onClick={controlQuizModal}>Add quiz</button> */}
        </div>
      </div>

      <AddModuleModal open={openAddModuleModal} control={controlModuleModal} />
    </>
  );
};

export default ControlPanel;

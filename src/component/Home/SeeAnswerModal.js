import React from 'react';
import close from '../../assets/images/close.png';
const SeeAnswerModal = ({ open, control }) => {
  return (
    open && (
      <div className="fixed w-full md:p-5 min-h-screen inset-0 bg-brand/50 z-10 cursor-pointer items-center justify-center overflow-y-scroll scrollbar-hide">
        <div className="bg-background rounded-md w-full min-h-full p-2">
          <div
            className="rounded-full bg-transparent flex items-center justify-end cursor-pointer"
            onClick={control}
          >
            <img className="w-4 h-4" src={close} alt="" />
          </div>
          <div className="flex flex-col gap-5 p-3"></div>
        </div>
      </div>
    )
  );
};

export default SeeAnswerModal;

import React from 'react';
import close from '../../assets/images/close.png';
import { AiFillWarning } from 'react-icons/ai';

const ConfirmationModal = ({ open, control, handleSubmit }) => {
  return (
    open && (
      <>
        <div className="fixed w-screen h-screen inset-0 z-10 bg-background/50 cursor-pointer flex items-center justify-center overflow-hidden">
          <div
            className="fixed w-screen h-screen bg-transparent z-10"
            onClick={control}
          ></div>
          <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-textPrimary z-[11]">
            <div className="relative">
              <div
                className="absolute right-0 top-0 w-5 h-5 flex items-center justify-center cursor-pointer"
                onClick={control}
              >
                <img className="w-5 h-5" src={close} alt="close" />
              </div>
              <div className="bg-red-100 text-red-500 p-5 flex flex-col gap-3">
                <h1 className="flex items-center gap-2 text-2xl">
                  <i>
                    <AiFillWarning />
                  </i>{' '}
                  Are You Sure to Submit Answers?
                </h1>
                <p>
                  Doing so will permanently Save this data in Server, can't
                  change any more.
                </p>
              </div>
              <div className="p-5 text-background flex flex-col gap-3 items-start">
                <div className="w-full flex justify-end gap-5">
                  <button
                    className="x bg-borderPrimary/00 hover:bg-borderPrimary all px-3 py-1 rounded-md"
                    onClick={control}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-3 py-1 rounded-md bg-red-600 text-textPrimary disabled:text-background disabled:bg-borderPrimary"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default ConfirmationModal;

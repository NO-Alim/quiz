import React, { useEffect, useState } from 'react';
import close from '../../assets/images/close.png';
import Error from '../ui/Error';
import LoaderSpin from '../ui/LoaderSpin';
import QuestionsContainer from './QuestionsContainer';

const ParticipateModal = ({ open, control, questions, item }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLoading = (e) => {
    setLoading(e);
  };

  const handleErrorMessage = (message) => {
    setErrorMessage(message);
  };

  let content;
  if (loading) {
    content = (
      <div className="flex-1 flex items-center justify-center">
        <LoaderSpin />
      </div>
    );
  }
  if (!loading && !errorMessage) {
    content = (
      <QuestionsContainer
        questions={questions}
        item={item}
        control={control}
        handleLoading={handleLoading}
        handleErrorMessage={handleErrorMessage}
      />
    );
  }

  if (!loading && errorMessage) {
    content = (
      <div className="flex-1 flex items-center justify-center">
        <Error message={errorMessage} />
      </div>
    );
  }
  return (
    open && (
      <>
        <div className="fixed w-full md:p-5 min-h-screen inset-0 bg-brand/50 z-10 items-center justify-center overflow-y-scroll scrollbar-hide">
          <div className="bg-background rounded-md w-full min-h-full flex flex-col p-2">
            <div
              className="rounded-full bg-transparent flex items-center justify-end cursor-pointer"
              onClick={control}
            >
              <img className="w-4 h-4" src={close} alt="" />
            </div>
            {content}
          </div>
        </div>
      </>
    )
  );
};

export default ParticipateModal;

import React from 'react';
import questionImage from '../../assets/images/question.png';
import wrong from '../../assets/images/wrong.png';
import rightTick from '../../assets/images/rightTick.png';
const SingleAnswerBody = ({ answer, results }) => {
  const { title, code, options, id, description } = answer || {};

  //result filter
  const thisItemResult = results.filter((resItem) => resItem.questionId === id);
  const { options: resultOptions } = thisItemResult[0] || {};
  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center gap-5">
        <img className="w-10" src={questionImage} alt="question" />
        <h1 className="text-2xl font-thin">{title}</h1>
      </div>
      <div className="code bg-black/40 rounded-md p-5">
        <pre>{code}</pre>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {options.map((item, ind) => {
          return (
            <div
              className={`flex gap-5 items-center cursor-pointer rounded-md `}
              key={ind}
            >
              <div
                className={`border border-brand px-5 p-2 rounded-md w-full flex gap-5 justify-between items-center ${
                  resultOptions[ind]?.selected === true ? 'bg-brand/30' : null
                }`}
              >
                <pre className="">{item.value}</pre>
                <img
                  className="w-5"
                  src={item.correct ? rightTick : wrong}
                  alt=""
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SingleAnswerBody;

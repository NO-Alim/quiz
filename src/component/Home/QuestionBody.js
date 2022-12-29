import React from 'react';
import questionImage from '../../assets/images/question.png';

const QuestionBody = ({ question, handleOptionClick }) => {
  const { title, code, options, id } = question || {};

  const handleClick = (e) => {
    const toggledSelected = {
      ...question,
      options: question.options.map((item, ind) => {
        if (ind === e) {
          if (!item?.selected) {
            return {
              ...item,
              selected: true,
            };
          } else {
            return {
              ...(delete item.selected && item),
            };
          }
        } else {
          return {
            ...item,
          };
        }
      }),
    };

    handleOptionClick(id, toggledSelected);
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center gap-5">
        <img className="w-10" src={questionImage} alt="question" />
        <h1 className="text-2xl font-thin">{title}</h1>
      </div>
      <div className="code bg-black/40 rounded-md p-5">
        <pre className="whitespace-pre-wrap">{code}</pre>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {options.map((item, ind) => {
          return (
            <div
              className={`flex gap-5 items-center cursor-pointer rounded-md ${
                item.selected === true ? 'bg-brand/20' : null
              }`}
              key={ind}
              onClick={() => {
                handleClick(ind);
              }}
            >
              <pre className="border border-brand px-5 p-2 rounded-md w-full whitespace-pre-wrap">
                {item.value}
              </pre>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionBody;

import React, { useEffect, useState } from 'react';
import close from '../../assets/images/close.png';
import { useAddAnswerMutation } from '../../features/answers/answersApi';
import { useAddQuestionMutation } from '../../features/question/questionsApi';
import Error from '../ui/Error';

const AddQuizModal = ({ open, control, module = null }) => {
  const [
    addQuestion,
    {
      isSuccess: isQuestionAddSuccess,
      isError: addQuestionError,
      error: addQuestionErrorMessage,
      loading: addQuestionLoading,
    },
  ] = useAddQuestionMutation();
  const [
    addAnswer,
    {
      isSuccess: isAnswerAddSuccess,
      isError: addAnswerError,
      error: addAnswerErrorMessage,
      loading: addAnswerLoading,
    },
  ] = useAddAnswerMutation();

  //local state
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [moduleId, setModuleId] = useState(module);

  const [option1, setOption1] = useState({
    value: '',
    correct: false,
  });
  const [option2, setOption2] = useState({
    value: '',
    correct: false,
  });
  const [option3, setOption3] = useState({
    value: '',
    correct: false,
  });
  const [option4, setOption4] = useState({
    value: '',
    correct: false,
  });
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let options = [option1, option2];
    //condationaly check if option3&& option4 and push into options
    if (option3.value !== '') {
      options.push(option3);
    }
    if (option4.value !== '') {
      options.push(option4);
    }

    //for questions options remove correct field
    const optionsValueOnly = options.map((item) => {
      return { value: item.value };
    });
    const dataForAnswer = {
      title,
      moduleId,
      code,
      description,
      options,
    };
    const dataForQuestion = {
      title,
      moduleId,
      code,
      options: optionsValueOnly,
    };

    //correct array for checking it include at list one true(correct)
    const correctList = options.map((item) => item.correct);
    if (!correctList.includes(true)) {
      setError('Must be Selected Answer.');
    } else {
      setError('');
      addQuestion({ data: dataForQuestion });
      addAnswer({ data: dataForAnswer });
    }
  };

  useEffect(() => {
    if (isQuestionAddSuccess && isAnswerAddSuccess) {
      setTitle('');
      setError('');
      setCode('');
      setOption1({
        value: '',
        correct: false,
      });
      setOption2({
        value: '',
        correct: false,
      });
      setOption3({
        value: '',
        correct: false,
      });
      setOption4({
        value: '',
        correct: false,
      });
      setDescription('');

      control();
    }
  }, [isQuestionAddSuccess, isAnswerAddSuccess]);

  useEffect(() => {
    if (addQuestionError) {
      setError(addQuestionError.data);
    } else if (addAnswerError) {
      setError(addAnswerError.data);
    } else {
      setError('');
    }
  }, [addQuestionError, addAnswerError]);
  return (
    open && (
      <div>
        <div className="fixed w-screen h-screen inset-0 z-10 bg-brand/50 cursor-pointer flex items-center justify-center overflow-y-scroll">
          <div
            className="fixed w-screen h-screen bg-transparent z-10"
            onClick={control}
          ></div>
          <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-textPrimary z-[11]">
            {/*  */}
            <div className="min-h-full flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-background rounded-md py-5 text-textPrimary relative">
              <div
                className="absolute right-0 top-0 w-5 h-5 rounded-full bg-transparent flex items-center justify-center cursor-pointer"
                onClick={control}
              >
                <img className="w-4 h-4" src={close} alt="" />
              </div>
              <div className="max-w-md w-full space-y-1">
                <div>
                  <h2 className="text-center text-3xl font-extrabold text-textPrimary">
                    Add Quiz
                  </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                  <div className="rounded-md shadow-sm flex flex-col gap-3">
                    <div className="flex gap-5">
                      <div className="flex flex-col gap-1 flex-1">
                        <label htmlFor="email-address" className="">
                          Title
                        </label>
                        <input
                          id="title"
                          name="title"
                          type="text"
                          value={title}
                          required
                          className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-background focus:outline-none focus:ring-brand focus:border-brand focus:z-10 sm:text-sm"
                          placeholder="Title *"
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col gap-1 flex-1">
                        <label htmlFor="password" className="">
                          Module Id
                        </label>
                        <input
                          id="module"
                          name="module"
                          type="module"
                          value={moduleId}
                          onChange={(e) => setModuleId(e.target.value)}
                          required
                          disabled
                          className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-background focus:outline-none focus:ring-brand focus:border-brand focus:z-10 sm:text-sm disabled:bg-brand/10 disabled:text-textPrimary"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="password" className="">
                        Code
                      </label>
                      <textarea
                        id="code"
                        name="code"
                        type="code"
                        value={code}
                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-background focus:outline-none focus:ring-brand focus:border-brand focus:z-10 sm:text-sm"
                        placeholder="Code"
                        onChange={(e) => setCode(e.target.value)}
                      />
                    </div>
                    <h1 className="text-bg text-brand font-bold">
                      Checked Correct Answer/Answers
                    </h1>
                    {/*  */}
                    <div className="flex gap-5">
                      <div className="flex flex-col gap-1 flex-1">
                        <label htmlFor="email-address" className="">
                          Option 1
                        </label>
                        <div className="flex items-center gap-5">
                          <input
                            className=""
                            type="checkbox"
                            checked={option1.correct}
                            onChange={(e) =>
                              setOption1({
                                ...option1,
                                correct: e.target.checked,
                              })
                            }
                          />
                          <input
                            id="option1"
                            name="option1"
                            type="text"
                            value={option1.value}
                            required
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-background focus:outline-none focus:ring-brand focus:border-brand focus:z-10 sm:text-sm"
                            placeholder="option 1 *"
                            onChange={(e) =>
                              setOption1({ ...option1, value: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 flex-1">
                        <label htmlFor="password" className="">
                          option 2
                        </label>
                        <div className="flex items-center gap-5">
                          <input
                            className=""
                            type="checkbox"
                            checked={option2.correct}
                            onChange={(e) =>
                              setOption2({
                                ...option2,
                                correct: e.target.checked,
                              })
                            }
                          />
                          <input
                            id="option2"
                            name="option2"
                            type="option2"
                            value={option2.value}
                            required
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-background focus:outline-none focus:ring-brand focus:border-brand focus:z-10 sm:text-sm"
                            placeholder="option 2 *"
                            onChange={(e) =>
                              setOption2({ ...option2, value: e.target.value })
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-5">
                      <div className="flex flex-col gap-1 flex-1">
                        <label htmlFor="email-address" className="">
                          Option 3
                        </label>
                        <div className="flex items-center gap-5">
                          <input
                            className=""
                            type="checkbox"
                            checked={option3.correct}
                            onChange={(e) =>
                              setOption3({
                                ...option3,
                                correct: e.target.checked,
                              })
                            }
                          />
                          <input
                            id="option3"
                            name="option3"
                            type="text"
                            value={option3.value}
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-background focus:outline-none focus:ring-brand focus:border-brand focus:z-10 sm:text-sm"
                            placeholder="option 3"
                            onChange={(e) =>
                              setOption3({ ...option3, value: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 flex-1">
                        <label htmlFor="password" className="">
                          option 4
                        </label>
                        <div className="flex items-center gap-5">
                          <input
                            className=""
                            type="checkbox"
                            checked={option4.correct}
                            onChange={(e) =>
                              setOption4({
                                ...option4,
                                correct: e.target.checked,
                              })
                            }
                          />
                          <input
                            id="option4"
                            name="option4"
                            type="option4"
                            value={option4.value}
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-background focus:outline-none focus:ring-brand focus:border-brand focus:z-10 sm:text-sm"
                            placeholder="option 4"
                            onChange={(e) =>
                              setOption4({ ...option4, value: e.target.value })
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                      <label htmlFor="email-address" className="">
                        Answer Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        type="number"
                        value={description}
                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-background focus:outline-none focus:ring-brand focus:border-brand focus:z-10 sm:text-sm"
                        placeholder="Answer Description"
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      disabled={addQuestionLoading || addAnswerLoading}
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-background bg-brand/90 hover:bg-brand focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand text-background"
                    >
                      Submit Quiz
                    </button>
                  </div>
                  {error !== '' && <Error message={error} />}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default AddQuizModal;

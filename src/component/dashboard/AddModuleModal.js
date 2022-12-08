import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import close from '../../assets/images/close.png';
import { useAddModuleMutation } from '../../features/module/moduleApi';
import Error from '../ui/Error';

const AddModuleModal = ({ open, control }) => {
  const [moduleName, setModuleName] = useState('');
  const [error, setError] = useState('');
  const { user } = useSelector((state) => state.auth);
  const { email } = user || {};

  const [addModule, { isSuccess, isError, error: responseError, loading }] =
    useAddModuleMutation();

  const handleSubmit = (e) => {
    e.preventDefault();

    addModule({
      data: {
        name: moduleName,
        author: email,
      },
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setModuleName('');
      control();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (responseError) {
      setError(responseError.data);
    }
  }, [responseError]);

  useEffect(() => {
    setModuleName('');
    setError('');
  }, [open]);

  return (
    open && (
      <>
        <div className="fixed w-screen h-screen inset-0 z-10 bg-brand/50 cursor-pointer flex items-center justify-center overflow-hidden">
          <div
            className="fixed w-screen h-screen bg-transparent z-10"
            onClick={control}
          ></div>
          <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-background z-[11]">
            <div className="p-10 relative">
              <div
                className="absolute right-0 top-0 w-5 h-5 rounded-full bg-transparent flex items-center justify-center cursor-pointer"
                onClick={control}
              >
                <img className="w-4 h-4" src={close} alt="" />
              </div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-textPrimary">
                Add Module
              </h2>
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                    <label htmlFor="module" className="sr-only">
                      Module
                    </label>
                    <input
                      id="module"
                      name="module"
                      type="text"
                      value={moduleName}
                      required
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-background focus:outline-none focus:ring-brand focus:border-brand focus:z-10 sm:text-sm"
                      placeholder="Name of Module"
                      onChange={(e) => setModuleName(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-background bg-brand/90 hover:bg-brand focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand text-background"
                  >
                    Add Module
                  </button>
                </div>
                {error && <Error message={error} />}
              </form>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default AddModuleModal;

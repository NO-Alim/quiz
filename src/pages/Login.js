import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import Error from '../component/ui/Error';
import { useLoginMutation } from '../features/auth/authApi';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [login, { data, isLoading, error: loginResponseError }] =
    useLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    login({
      email,
      password,
    });
  };

  useEffect(() => {
    if (loginResponseError?.data) {
      setError(loginResponseError.data);
    }

    if (data?.accessToken && data?.user) {
      navigate('/');
    }
  }, [data, loginResponseError, navigate]);

  return (
    <div className="grid place-items-center h-screen bg-background">
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <Link to="/">
              <img className="mx-auto h-12 w-auto" src={logo} alt="Mralim" />
            </Link>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-textPrimary">
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  value={email}
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-background rounded-t-md focus:outline-none focus:ring-brand focus:border-brand focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-background rounded-b-md focus:outline-none focus:ring-brand focus:border-brand focus:z-10 sm:text-sm"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-end">
              <div className="text-sm">
                <Link
                  to="/register"
                  className="font-medium text-brand/90 hover:text-brand"
                >
                  Register
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-background bg-brand/90 hover:bg-brand focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand text-background"
              >
                Sign in
              </button>
            </div>

            {error !== '' && <Error message={error} />}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

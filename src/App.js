import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './component/PrivateRoute';
import PublicRoute from './component/PublicRoute';
import useAuthCheck from './hooks/useAuthCheck';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Ranking from './pages/Ranking';
import Register from './pages/Register';
import ControlPanel from './pages/ControlPanel';
import { useSelector } from 'react-redux';
const App = () => {
  const { user } = useSelector((state) => state.auth);
  const { email } = user;
  const authChecked = useAuthCheck();

  return !authChecked ? (
    <h1>Checking Authentication</h1>
  ) : (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        {email === process.env.REACT_APP_ADMIN_EMAIL && (
          <Route
            path="/controlPanel"
            element={
              <PrivateRoute>
                <ControlPanel />
              </PrivateRoute>
            }
          />
        )}

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/ranking"
          element={
            <PrivateRoute>
              <Ranking />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

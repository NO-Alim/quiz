import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './component/PrivateRoute';
import PublicRoute from './component/PublicRoute';
import useAuthCheck from './hooks/useAuthCheck';
import Home from './pages/Home';
import Login from './pages/Login';
import Questions from './pages/Questions';
import Register from './pages/Register';
import Score from './pages/Score';
import Settings from './pages/Settings';
const App = () => {
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
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Score />
            </PrivateRoute>
          }
        />
        <Route
          path="/questions"
          element={
            <PrivateRoute>
              <Questions />
            </PrivateRoute>
          }
        />
        <Route
          path="/setting"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

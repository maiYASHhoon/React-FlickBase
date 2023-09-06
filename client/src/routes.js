import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { isAuth } from './store/action/user';
import { Loader } from './utils/tools';
import MainLayout from './hoc/mainLayout';
import Header from './components/navigation/header';
import Home from './components/home';
import Auth from './components/auth';
import Dashboard from './components/dashboard';
const Router = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(isAuth());
  }, []);
  useEffect(() => {
    if (users.auth !== null) {
      setLoading(false);
    }
  }, [users]);
  return (
    <BrowserRouter>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <MainLayout>
            <Routes>
              <Route
                path="/dashboard"
                element={<Dashboard />}
              />
              <Route
                path="/auth"
                element={<Auth />}
              />
              <Route
                path="/"
                element={<Home />}
              />
            </Routes>
          </MainLayout>
        </>
      )}
    </BrowserRouter>
  );
};
export default Router;

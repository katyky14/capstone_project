import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';

import GetAllBusiness from './components/business/getAllBusiness';
import GetBusinessById from './components/business/businessDetail';
import CreateBusinessForm from './components/business/businessForm';
import EditBusinessForm from './components/business/editBusinessForm';
import Navigation from './components/Navigation';
import OwnerBusiness from './components/business/ownerBusiness';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Navigation loaded={loaded} />
      <Switch>


        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>


        <ProtectedRoute path='/business/owner' exact={true}>
          <OwnerBusiness />
        </ProtectedRoute>

        <ProtectedRoute path='/business/new' exact={true}>
          <CreateBusinessForm />
        </ProtectedRoute>
        <ProtectedRoute path='/business/:businessId/edit'>
          <EditBusinessForm />
        </ProtectedRoute>
        <Route path='/business/:businessId' exact={true}>
          <GetBusinessById />
        </Route>
        <Route path='/business' exact={true}>
          <GetAllBusiness />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

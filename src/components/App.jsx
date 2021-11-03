import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import AuthenticateRoute from './AuthenticateRoute';

import LandingPage from '../pages/Landing';
import DashboardPage from '../pages/Dashboard';
import ProfilePage from '../pages/Profile';
import AddBook from '../pages/AddBook';
import Lists from '../pages/Lists';
import AddList from '../pages/AddList';
import FavoritesPage from '../pages/Favorites';


function App() {
  const { isAuthenticated } = useAuth0();
  const authedRedirect = (Component) =>
    isAuthenticated ? <Redirect to="/dashboard" /> : <Component />;
  return (
    <>
      <main>
        <Switch>
          <Route path="/" exact>
            {authedRedirect(LandingPage)}
          </Route>
          <AuthenticateRoute path="/dashboard">
            <DashboardPage />
          </AuthenticateRoute>
          <AuthenticateRoute path="/profile">
            <ProfilePage />
          </AuthenticateRoute>
          <AuthenticateRoute path="/add-book">
            <AddBook />
          </AuthenticateRoute>
          <AuthenticateRoute path="/favorites">
            <FavoritesPage />
          </AuthenticateRoute>

          <AuthenticateRoute path="/lists">
            <Lists />
          </AuthenticateRoute>
          <AuthenticateRoute path="/add-list">
            <AddList />
          </AuthenticateRoute>
        </Switch>
      </main>
    </>
  );
}

export default App;

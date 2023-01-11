import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import AuthenticateRoute from './AuthenticateRoute';

import LandingPage from '../pages/Landing';
import DashboardPage from '../pages/Dashboard';
import ProfilePage from '../pages/Profile';
import AddBook from '../pages/AddBook';
import Lists from '../pages/Lists';
import AddList from '../pages/AddList';
import FavoritesPage from '../pages/Favorites';
import BookPage from '../pages/BookPage';
import AuthPage from '../pages/Auth';
import { PageProvider } from '../contexts/page-context';
import { ToastProvider } from '../contexts/toast-context';
import Toasts from './Toasts';

const queryClient = new QueryClient();

function App() {
  const { isAuthenticated } = useAuth0();

  const authedRedirect = (Component) =>
    isAuthenticated ? <Redirect to="/auth" /> : <Component />;
  return (
    <QueryClientProvider client={queryClient}>
      <PageProvider>
        <ToastProvider>
          <Toasts />
          <main>
            <Switch>
              <Route path="/" exact>
                {authedRedirect(LandingPage)}
              </Route>
              <AuthenticateRoute path="/auth">
                <AuthPage />
              </AuthenticateRoute>
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
              <AuthenticateRoute path="/book/:book_id">
                <BookPage />
              </AuthenticateRoute>
              <AuthenticateRoute path="/lists">
                <Lists />
              </AuthenticateRoute>
              <AuthenticateRoute path="/add-list">
                <AddList />
              </AuthenticateRoute>
            </Switch>
          </main>
        </ToastProvider>
      </PageProvider>

      <ReactQueryDevtools InitialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;

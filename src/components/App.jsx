import React from 'react';
import { Redirect, Route, Switch, BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import AuthenticateRoute from './AuthenticateRoute';
import AuthTokenSaver from './AuthTokenSaver';

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
  return (
    <QueryClientProvider client={queryClient}>
      <PageProvider>
        <ToastProvider>
          <Toasts />
          {/* Add AuthTokenSaver to capture and store tokens */}
          <AuthTokenSaver />
          <Route path="/" component={LandingPage} exact />
          <Route component={AuthPage} path="/auth" />
          <Route component={DashboardPage} path="/dashboard" />
          <Route component={ProfilePage} path="/profile" />
          <Route component={AddBook} path="/add-book" />
          <Route component={FavoritesPage} path="/favorites" />
          <Route component={BookPage} path="/book/:book_id" />
          <Route component={Lists} path="/lists" />
          <Route component={AddList} path="/add-list" />
        </ToastProvider>
      </PageProvider>
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools InitialIsOpen={false} position="bottom-right" />
      )}
    </QueryClientProvider>
  );
}

export default App;

import React from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import UserProvider from './providers/AuthProvider';
import ChartScreen from './screens/ChartScreen';
import HomeScreen from './screens/HomeScreen';
import PageNotFound from './screens/404Screen';

const App = () => (
  <UserProvider>
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/logs/:id" component={ChartScreen} />
        <Route exact path="/" component={HomeScreen} />
        <Route path="/404" component={PageNotFound} />
        <Redirect from="*" to="/404" />
      </Switch>
    </BrowserRouter>
  </UserProvider>
);

export default App;

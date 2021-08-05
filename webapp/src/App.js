import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import UserProvider from './providers/AuthProvider';
import ChartScreen from './screens/ChartScreen';
import HomeScreen from './screens/HomeScreen';

const App = () => (
  <UserProvider>
    <BrowserRouter>
      <Switch>
        <Route path="/logs" component={ChartScreen} />
        <Route exact path="/" component={HomeScreen} />
      </Switch>
    </BrowserRouter>
  </UserProvider>
);

export default App;

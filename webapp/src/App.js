import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ChartScreen from './screens/ChartScreen';
import HomeScreen from './screens/HomeScreen';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/logs" component={ChartScreen} />
      <Route path="/" component={HomeScreen} />
    </Switch>
  </BrowserRouter>
);

export default App;

import React from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import UserProvider from './providers/AuthProvider';
import ChartScreen from './screens/ChartScreen';
import HomeScreen from './screens/HomeScreen';
import PageNotFound from './screens/404Screen';
import './css/styles.css';

const App = () => (
  <UserProvider>
    <BrowserRouter>
      <Navbar />
      <Box paddingTop="24" bgColor="gray.800" height="100vh">
        <Switch>
          <Route path="/logs/:id" component={ChartScreen} />
          <Route exact path="/" component={HomeScreen} />
          <Route path="/404" component={PageNotFound} />
          <Redirect from="*" to="/404" />
        </Switch>
      </Box>
    </BrowserRouter>
  </UserProvider>
);

export default App;

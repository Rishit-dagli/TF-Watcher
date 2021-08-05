import React, { useState, useContext, useEffect } from 'react';
import {
  Button, VStack, Text,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../providers/AuthProvider';

const HomeScreen = () => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    if (user) setLoginStatus(true);
  }, [user]);

  return (
    <VStack>
      {/* <Text fontSize="3xl">Home screen</Text> */}
      { loginStatus
        ? <Button onClick={() => history.push('/logs')}>View logs</Button>
        : <Text fontSize="2xl">Login to get started!</Text>}
    </VStack>
  );
};

export default HomeScreen;

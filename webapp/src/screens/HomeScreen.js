import React, { useState, useContext, useEffect } from 'react';
import {
  Button, VStack, Text, useToast,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { logOut, signInWithGoogle } from '../firebase/Firebase';
import { UserContext } from '../providers/AuthProvider';

const HomeScreen = () => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const [loginStatus, setLoginStatus] = useState(false);
  const [err, setErr] = useState(false);
  const toast = useToast();

  const login = async () => {
    const success = await signInWithGoogle();
    setErr(!success);
  };

  const logout = async () => {
    const success = await logOut();
    if (success) history.go(0);
    else setErr(!success);
  };

  useEffect(() => {
    if (user) setLoginStatus(true);
  }, [user]);

  useEffect(() => {
    if (err) {
      toast({
        title: 'Error',
        description: 'Something went wrong! Please try again',
        status: 'error',
        duration: 8000,
        isClosable: true,
      });
    }
  }, [err]);

  return (
    <VStack>
      <Text fontSize="3xl">Home screen</Text>
      { loginStatus
        ? (
          <>
            <Button onClick={logout}>Logout</Button>
            <Button onClick={() => history.push('/logs')}>View logs</Button>
          </>
        )
        : <Button onClick={login}>Login</Button>}
    </VStack>
  );
};

export default HomeScreen;

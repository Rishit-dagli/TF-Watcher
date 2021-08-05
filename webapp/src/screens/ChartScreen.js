import React, { useContext, useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import {
  Button, VStack, Text, useToast,
} from '@chakra-ui/react';
import { UserContext } from '../providers/AuthProvider';
import { logOut } from '../firebase/Firebase';

const ChartScreen = () => {
  const history = useHistory();
  const { user, loading } = useContext(UserContext);
  const [err, setErr] = useState(false);
  const toast = useToast();

  const logout = async () => {
    const success = await logOut();
    if (success) history.go(0);
    else setErr(!success);
  };

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
    <>
      { !loading && !user ? (
        <Redirect to="/" />
      ) : (
        <VStack>
          <Text fontSize="3xl">Chart screen</Text>
          <Button onClick={logout}>Logout</Button>
        </VStack>
      )}
    </>
  );
};

export default ChartScreen;

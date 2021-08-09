import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Text, Button, Flex, useToast,
} from '@chakra-ui/react';

import { logOut, signInWithGoogle } from '../firebase/Firebase';
import { UserContext } from '../providers/AuthProvider';

const Navbar = () => {
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
    if (success) {
      history.replace('/');
      history.go(0);
    } else setErr(!success);
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
    <Flex bgColor="teal.50" alignItems="center" paddingY="4" paddingX={{ base: '8', md: '20', lg: '28' }} marginBottom="5" boxShadow="lg">
      <Text flexGrow="1" fontSize="large" fontWeight="bold">TF Watcher</Text>
      <Button
        size="sm"
        colorScheme="teal"
        fontWeight="bold"
        paddingX="5"
        variant="link"
        onClick={loginStatus ? logout : login}
      >
        {loginStatus ? 'Logout' : 'Login'}
      </Button>
    </Flex>
  );
};

export default Navbar;

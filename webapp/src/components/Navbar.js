import React, { useEffect, useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Text, Button, Flex, useToast, Image, HStack,
} from '@chakra-ui/react';

import { logOut, signInWithGoogle } from '../firebase/Firebase';
import { UserContext } from '../providers/AuthProvider';
import logo from '../assets/tf-watcher.png';

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
    <Flex
      bgColor="gray.800"
      alignItems="center"
      paddingY="3"
      paddingX={{ base: '8', md: '20', lg: '28' }}
      position="fixed"
      width="100%"
      top="0"
      zIndex="10"
      opacity="0.9"
    >
      <Link to="/" style={{ flexGrow: 1 }}>
        <HStack>
          <Image src={logo} boxSize={{ base: 8, md: 10 }} bgSize="contain" />
          <Text fontWeight="bold" color="white" display={{ base: 'none', md: 'block' }}>TF Watcher</Text>
        </HStack>
      </Link>
      <Button
        size="sm"
        colorScheme="teal"
        paddingX="6"
        paddingY="2"
        onClick={loginStatus ? logout : login}
      >
        {loginStatus ? 'Logout' : 'Login'}
      </Button>
    </Flex>
  );
};

export default Navbar;

import React, { useEffect, useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Text, Button, Flex, useToast, Image, HStack, VStack,
} from '@chakra-ui/react';
import GitHubButton from 'react-github-btn';

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
    <Flex
      bgColor="gray.900"
      align="center"
      paddingY="3"
      paddingX={{ base: '6', md: '20', lg: '28' }}
      position="fixed"
      width="100%"
      top="0"
      zIndex="10"
      opacity="0.9"
      justify="center"
    >
      <Link to="/" style={{ flexGrow: 1 }}>
        <HStack>
          <Image src={logo} boxSize={{ base: 7 }} bgSize="contain" />
          <Text fontWeight="bold" color="white" display={{ base: 'none', md: 'block' }}>TF Watcher</Text>
        </HStack>
      </Link>
      <VStack paddingTop="1.5">
        <GitHubButton
          href="https://github.com/Rishit-dagli/TF-Watcher"
          data-size="large"
          data-show-count="true"
          aria-label="Star Rishit-dagli/TF-Watcher on GitHub"
          id="star-btn"
        >
          Star
        </GitHubButton>
      </VStack>
      <Button
        marginLeft="4"
        size="xs"
        colorScheme="teal"
        paddingX="5"
        height="7"
        borderRadius="sm"
        onClick={loginStatus ? logout : login}
      >
        {loginStatus ? 'Logout' : 'Login'}
      </Button>
    </Flex>
  );
};

export default Navbar;

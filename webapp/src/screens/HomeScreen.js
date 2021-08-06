import React, { useState, useContext, useEffect } from 'react';
import {
  Button, VStack, Text, Input, HStack, useToast,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../providers/AuthProvider';
import { db } from '../firebase/Firebase';

const HomeScreen = () => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const [loginStatus, setLoginStatus] = useState(false);
  const [key, setKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (user) setLoginStatus(true);
  }, [user]);

  useEffect(() => {
    if (err) {
      toast({
        title: 'Error',
        description: 'Could not find a active process with that key!',
        status: 'error',
        duration: 8000,
        isClosable: true,
      });
    }
  }, [err]);

  const searchId = () => {
    setLoading(true);
    const rootRef = db.ref();
    let flag = 0;
    rootRef.on('value', (snapshot) => {
      snapshot.forEach((child) => {
        if (child.key === key) {
          flag = 1;
          return;
        }
        setLoading(false);
      });
      if (!flag) setErr(true);
      else { history.push(`/logs/${key}`); }
    });
  };

  return (
    <VStack>
      { !loginStatus
        ? <Text fontSize="2xl">Login to get started!</Text>
        : (
          <HStack>
            <Input
              placeholder="Enter key"
              onChange={(e) => setKey(e.target.value)}
              maxW="md"
              variant="outline"
              boxShadow="md"
              onKeyPress={(e) => (e.key === 'Enter' ? searchId() : null)}
              disabled={loading}
            />
            <Button
              onClick={searchId}
              colorScheme="teal"
              paddingX="10"
              boxShadow="lg"
              isLoading={loading}
            >
              View logs
            </Button>
          </HStack>
        )}
    </VStack>
  );
};

export default HomeScreen;

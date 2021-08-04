import React from 'react';
import { Button, VStack, Text } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

const HomeScreen = () => {
  const history = useHistory();
  return (
    <VStack>
      <Text fontSize="3xl">Home Screen</Text>
      <Button onClick={() => history.push('/logs')}>View Charts</Button>
    </VStack>
  );
};

export default HomeScreen;

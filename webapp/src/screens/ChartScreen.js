import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import {
  VStack, Text,
} from '@chakra-ui/react';
import { UserContext } from '../providers/AuthProvider';

const ChartScreen = () => {
  const { user, loading } = useContext(UserContext);

  return (
    <>
      { !loading && !user ? (
        <Redirect to="/" />
      ) : (
        <VStack>
          <Text fontSize="3xl">Chart screen</Text>
        </VStack>
      )}
    </>
  );
};

export default ChartScreen;

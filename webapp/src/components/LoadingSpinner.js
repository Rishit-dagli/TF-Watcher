import React from 'react';
import { VStack, Spinner } from '@chakra-ui/react';

const LoadingSpinner = () => (
  <VStack marginTop="10">
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="teal.400"
      size="xl"
    />
  </VStack>
);

export default LoadingSpinner;

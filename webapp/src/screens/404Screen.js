import React from 'react';
import { Link } from 'react-router-dom';
import { VStack, Text, Button } from '@chakra-ui/react';

const PageNotFound = () => (
  <VStack paddingX="4" textAlign="center">
    <Text fontSize="3xl" color="teal.400" fontWeight="bold">Oops!</Text>
    <Text fontSize="lg" fontWeight="medium" color="white">The page you are looking for does not exist</Text>
    <Link to="/"><Button colorScheme="teal" marginTop="6">Go back home</Button></Link>
  </VStack>
);

export default PageNotFound;

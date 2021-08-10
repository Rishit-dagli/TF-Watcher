import React from 'react';
import {
  Container, Text, Button, Flex,
} from '@chakra-ui/react';

const TextContainer = () => (
  <Container maxW="container.md" marginTop="16">
    <Text fontSize="large" textAlign="justify">
      Et magna sit duis reprehenderit reprehenderit amet
      proident dolor laborum culpa incididunt nisi labore. Pariatur
      veniam incididunt amet dolore aute cillum do est pariatur dolor
      esse et. In amet ex ea irure pariatur. Sunt amet aliquip aliquip
      ipsum eu. Esse est eu nulla adipisicing dolore. Velit cillum ex
      eiusmod et ut elit amet culpa duis elit labore.
      esse et. In amet ex ea irure pariatur. Sunt amet aliquip aliquip
      ipsum eu. Esse est eu nulla adipisicing dolore. Velit cillum ex
      eiusmod et ut elit amet culpa duis elit labore.
    </Text>
    <Flex flexDir={{ base: 'column', md: 'row' }} justify="center" marginTop="8">
      <Button
        bgColor="purple.700"
        variant="outline"
        colorScheme="white"
        marginRight={{ base: '0', md: '3' }}
        marginBottom={{ base: '3', md: '0' }}
        boxShadow="lg"
      >
        Checkout the Repository
      </Button>
      <Button
        bgColor="purple.700"
        variant="outline"
        colorScheme="white"
        paddingX="15"
        width="48"
        boxShadow="lg"
      >
        Read the docs
      </Button>
    </Flex>
  </Container>
);

export default TextContainer;

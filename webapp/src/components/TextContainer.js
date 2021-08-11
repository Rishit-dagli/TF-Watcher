import React from 'react';
import {
  Container, Text, Button, Flex,
} from '@chakra-ui/react';
import { FaGithub, FaRegListAlt } from 'react-icons/fa';

const TextContainer = () => (
  <Container maxW="container.lg" marginTop="16">
    <Text fontSize="md" textAlign="center" paddingX="6">
      Et magna sit duis reprehenderit reprehenderit amet
      proident dolor laborum culpa incididunt nisi labore. Pariatur
      veniam incididunt amet dolore aute cillum do est pariatur dolor
      esse et. In amet ex ea irure pariatur. Sunt amet aliquip aliquip
      ipsum eu. Esse est eu nulla adipisicing dolore. Velit cillum ex
      eiusmod et ut elit amet culpa duis elit labore.
      esse et. In amet ex ea irure pariatur. Sunt amet aliquip aliquip
      ipsum eu. Esse est eu nulla adipisicing dolore. Velit cillum ex
      eiusmod et ut elit amet culpa duis elit labore.
      In amet ex ea irure pariatur. Sunt amet aliquip aliquip
      ipsum eu. Esse est eu nulla adipisicing dolore. Velit cillum ex
      eiusmod et ut elit amet culpa duis elit labore.
    </Text>
    <Flex flexDir={{ base: 'column', md: 'row' }} justify="center" marginTop="8" align="center">
      <Button
        bgColor="gray.700"
        variant="outline"
        colorScheme="white"
        marginRight={{ base: '0', md: '3' }}
        marginBottom={{ base: '3', md: '0' }}
        width="52"
        boxShadow="lg"
        leftIcon={<FaGithub />}
      >
        GitHub
      </Button>
      <Button
        bgColor="gray.700"
        variant="outline"
        colorScheme="white"
        paddingX="15"
        width="52"
        boxShadow="lg"
        leftIcon={<FaRegListAlt />}
      >
        Docs
      </Button>
    </Flex>
  </Container>
);

export default TextContainer;

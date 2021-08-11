import React from 'react';
import {
  Container, Text, Button, Flex,
} from '@chakra-ui/react';
import { FaGithub, FaRegListAlt, FaRocket } from 'react-icons/fa';

import intro from '../assets/info.json';

const TextContainer = () => (
  <Container maxW="container.lg" marginTop="16">
    <Text fontSize="md" textAlign="center" paddingX="6">
      {intro.desc}
    </Text>
    <Flex flexDir={{ base: 'column', md: 'row' }} justify="center" marginTop="8" align="center">
      <a href="https://github.com/Rishit-dagli/TF-Watcher" target="_blank" rel="noreferrer">
        <Button
          bgColor="gray.700"
          variant="outline"
          colorScheme="white"
          marginRight={{ base: '0', md: '3' }}
          marginBottom={{ base: '3', md: '0' }}
          width="48"
          boxShadow="lg"
          leftIcon={<FaGithub />}
        >
          GitHub
        </Button>
      </a>
      <Button
        bgColor="gray.700"
        variant="outline"
        colorScheme="white"
        marginRight={{ base: '0', md: '3' }}
        marginBottom={{ base: '3', md: '0' }}
        width="48"
        boxShadow="lg"
        leftIcon={<FaRegListAlt />}
      >
        Documentation
      </Button>
      <Button
        bgColor="gray.700"
        variant="outline"
        colorScheme="white"
        width="48"
        boxShadow="lg"
        leftIcon={<FaRocket />}
      >
        Quickstart
      </Button>
    </Flex>
  </Container>
);

export default TextContainer;

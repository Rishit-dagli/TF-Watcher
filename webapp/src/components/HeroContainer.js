import React, { useState } from 'react';
import {
  Button, Input, Flex, Text,
} from '@chakra-ui/react';

import info from '../assets/info.json';
import ParticlesComponent from './ParticlesComponent';

const HeroContainer = (params) => {
  const { searchId, searchLoading } = params;
  const [key, setKey] = useState('');

  const onButtonClick = () => {
    searchId(key);
  };

  return (
    <Flex
      flexDir="column"
      height="85vh"
      style={{ backgroundImage: 'linear-gradient(#1A202C, #2D3748)' }}
      borderBottomRightRadius={{ base: '100', md: '250' }}
      boxShadow="2xl"
      align="center"
      justify="center"
    >
      <ParticlesComponent />
      <Text fontSize="4xl" fontWeight="bold" marginTop="-20">TF WATCHER</Text>
      <Text marginTop="10" marginBottom="8" maxW={{ base: 'xs', sm: 'md', md: 'xl' }} textAlign="center">
        {info.intro}
        <br />
        {info.intro2}
      </Text>
      <Flex flexDir={{ base: 'column', lg: 'row' }}>
        <Input
          placeholder="Enter key"
          onChange={(e) => setKey(e.target.value.trim())}
          maxW="xl"
          variant="outline"
          boxShadow="md"
          onKeyPress={(e) => (e.key === 'Enter' ? onButtonClick() : null)}
          disabled={searchLoading}
          color="white"
          marginRight={{ base: 0, lg: 2 }}
          marginBottom={{ base: 2, lg: 0 }}
        />
        <Button
          onClick={onButtonClick}
          colorScheme="purple"
          paddingX="10"
          boxShadow="lg"
          isLoading={searchLoading}
        >
          View logs
        </Button>
      </Flex>
    </Flex>
  );
};

export default HeroContainer;

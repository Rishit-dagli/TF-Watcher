import React from 'react';
import { Flex, Text, Button } from '@chakra-ui/react';

const Footer = () => (
  <Flex
    bgColor="gray.800"
    // height="48"
    borderTopRightRadius="25"
    borderTopLeftRadius="25"
    paddingX={{ base: '8', lg: '16' }}
    paddingY="12"
    flexDir={{ base: 'column', md: 'row' }}
    justify="space-evenly"
  >
    <Flex flexDirection="column" width="xs" alignItems="flex-start">
      <Text fontWeight="bold">TF WATCHER</Text>
      <Text fontSize="small">
        Aute enim deserunt Lorem aliqua cillum.
        Aute enim deserunt Lorem aliqua cillum.Aute enim deserunt Lorem aliqua cillum.
        Aute enim deserunt Lorem aliqua cillum.Aute enim deserunt Lorem aliqua cillum.
      </Text>
      <Button colorScheme="teal" size="sm" marginTop="6" fontWeight="normal">Contact Us</Button>
    </Flex>
    <Flex flexDirection="column" width="xs" marginTop={{ base: '5', md: '0' }}>
      <Text fontWeight="bold">Attributions</Text>
      <Text fontSize="small">
        <a target="_blank" href="https://icons8.com/icon/7czWg1BJEt6Z/graph" rel="noreferrer">Graph</a>
        {' '}
        icon by
        <a target="_blank" href="https://icons8.com" rel="noreferrer">Icons8</a>
      </Text>
    </Flex>
  </Flex>
);

export default Footer;

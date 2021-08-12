import React from 'react';
import { Flex, Text, Button } from '@chakra-ui/react';
import info from '../assets/info.json';

const Footer = () => (
  <>
    <Flex
      bgColor="gray.800"
      borderTopRightRadius="95"
      paddingX={{ base: '6', lg: '16' }}
      paddingTop="12"
      paddingBottom="6"
      flexDir={{ base: 'column', md: 'row' }}
      justify="space-evenly"
      borderTop="2px solid #2C7A7B"
    >
      <Flex flexDirection="column" width={{ base: '64', md: 'xs' }} alignItems="flex-start">
        <Text fontWeight="bold">TF WATCHER</Text>
        <Text fontSize="small">{ info.footer }</Text>
        <Button
          colorScheme="teal"
          size="sm"
          marginTop="6"
          fontWeight="normal"
          onClick={() => window.open('mailto:tf-watcher-team@googlegroups.com')}
        >
          Contact Us
        </Button>
      </Flex>
      <Flex flexDirection="column" width={{ base: '64', md: 'xs' }} marginTop={{ base: '5', md: '0' }}>
        <Text fontWeight="bold">Attributions</Text>
        <Text fontSize="small">
          <a target="_blank" href="https://icons8.com/icon/7czWg1BJEt6Z/graph" rel="noreferrer">Graph</a>
          {' '}
          icon by
          {' '}
          <a target="_blank" href="https://icons8.com" rel="noreferrer">Icons8</a>
        </Text>
        <Text fontSize="small">
          Icons from
          {' '}
          <a target="_blank" href="http://fontawesome.io" rel="noreferrer">Font Awesome by Dave Gandy</a>
        </Text>
      </Flex>
    </Flex>
    <Flex bgColor="gray.900" justify="center" paddingY="2">
      <Text fontSize="sm">Dedicated to all ML developers with 💜</Text>
    </Flex>
  </>
);

export default Footer;

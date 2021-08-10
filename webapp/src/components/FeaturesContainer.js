import React from 'react';
import {
  Box, Flex, HStack, Text, Image,
} from '@chakra-ui/react';

import info from '../assets/info.json';

const FeatureCard = (data) => (
  <HStack maxW="md" margin="4" borderRadius="20" key={data} width={{ base: 'xs', md: 'md', lg: 'xl' }}>
    <Image
      src="gibbresh.png"
      fallbackSrc="https://via.placeholder.com/150"
      borderRadius="25"
      marginRight="-10"
      zIndex="2"
      boxShadow="dark-lg"
    />
    <Box
      bgColor="gray.800"
      height="150"
      width="100%"
      borderRadius="25"
      padding={{ base: '4', md: '8' }}
      paddingLeft={{ base: '10', md: '12' }}
      boxShadow="dark-lg"
    >
      <Text color="white">
        {data}
      </Text>
    </Box>
  </HStack>
);

const FeaturesContainer = () => (
  <Box paddingY="16">
    <Text fontSize="3xl" textAlign="center" fontWeight="bold" marginBottom="5">Features</Text>
    <Flex align="center" flexDir="column">
      <Flex flexDir={{ base: 'column', lg: 'row' }}>
        {info.features.slice(0, 2).map((item) => FeatureCard(item))}
      </Flex>
      <Flex flexDir={{ base: 'column', lg: 'row' }}>
        {info.features.slice(2).map((item) => FeatureCard(item))}
      </Flex>
    </Flex>
  </Box>
);

export default FeaturesContainer;

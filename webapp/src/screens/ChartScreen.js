import React, {
  useContext, useState, useEffect,
} from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import {
  VStack, Text, Button, Flex, Container,
} from '@chakra-ui/react';

import { UserContext } from '../providers/AuthProvider';
import { db, redirectWithGoogle } from '../firebase/Firebase';

import LoadingSpinner from '../components/LoadingSpinner';
import ChartsContainer from '../components/ChartsContainer';
import Footer from '../components/Footer';

const ChartScreen = () => {
  const { id } = useParams();
  const history = useHistory();
  const { user, loading } = useContext(UserContext);
  const [logs, setLogs] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  const login = () => {
    redirectWithGoogle();
  };

  useEffect(() => {
    if (!loading && !user) login();
  }, [user, loading]);

  useEffect(() => {
    const rootRef = db.ref();
    let flag = 0;
    rootRef.on('value', (snapshot) => {
      snapshot.forEach((child) => {
        if (child.key === id) {
          flag = 1;
          return;
        }
        setPageLoading(false);
      });
      if (!flag) history.push('/404');
    });
  }, []);

  useEffect(() => {
    db.ref(id).on('value', (snapshot) => {
      const getAllData = [];
      snapshot.forEach((snap) => {
        getAllData.push(snap.val());
      });
      const newLogs = [];
      getAllData.forEach((element) => {
        Object.keys(element).map((x) => {
          newLogs.push(element[x]);
          return null;
        });
      });
      setLogs(newLogs);
    });
  }, []);

  if (pageLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      { !loading && !user ? (
        <Redirect to="/" />
      ) : (
        <VStack bgColor="gray.800">
          <Flex
            justify="space-between"
            flexDir="row"
            align="center"
            width={{
              base: 'xs', sm: 'sm', md: '2xl', xl: '6xl',
            }}
          >
            <Text fontSize="xl" marginTop="4" fontWeight="semibold" color="gray.300">Real-time logs</Text>
            <Button colorScheme="gray" color="purple.400" paddingX="8" variant="outline">Share link</Button>
          </Flex>
          <ChartsContainer data={logs} />
          <Container
            w="100%"
            maxW="100vw"
            paddingInlineEnd="0"
            paddingInlineStart="0"
            color="white"
          >
            <Footer />
          </Container>
        </VStack>
      )}
    </>
  );
};

export default ChartScreen;

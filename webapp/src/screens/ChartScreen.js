import React, {
  useContext, useState, useEffect,
} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  VStack, Text, Button, Flex, Container, useToast,
} from '@chakra-ui/react';
import { FaShareAlt } from 'react-icons/fa';

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
  const [copyStatus, setCopyStatus] = useState(false);
  const toast = useToast();

  const login = () => {
    redirectWithGoogle();
  };

  useEffect(() => {
    if (!loading && !user) login();
  }, [loading, user]);

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

  useEffect(() => {
    if (copyStatus) {
      toast({
        title: 'Success',
        description: 'Link copied to clipboard',
        status: 'success',
        duration: 1000,
        isClosable: true,
      });
    }
  }, [copyStatus]);

  const shareLink = () => {
    setCopyStatus(true);
    navigator.clipboard.writeText(`https://www.tfwatcher.tech/logs/${id}`)
      .then(() => setCopyStatus(false));
  };

  if (pageLoading) {
    return <LoadingSpinner />;
  }

  return (
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
        <Button
          bgColor="purple.600"
          color="white"
          paddingX="5"
          onClick={shareLink}
          leftIcon={<FaShareAlt />}
          className="share-btn"
          size="sm"
          marginTop="4"
        >
          Share link
        </Button>
      </Flex>
      <ChartsContainer data={logs} />
      <Container
        w="100%"
        maxW="100vw"
        paddingInlineEnd="0"
        paddingInlineStart="0"
        color="white"
        paddingTop="8"
      >
        <Footer />
      </Container>
    </VStack>
  );
};

export default ChartScreen;

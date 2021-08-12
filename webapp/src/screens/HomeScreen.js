import React, { useState, useContext, useEffect } from 'react';
import {
  useToast, Container,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

import { UserContext } from '../providers/AuthProvider';
import { db } from '../firebase/Firebase';
import LoadingSpinner from '../components/LoadingSpinner';
import HeroContainer from '../components/HeroContainer';
import FeaturesContainer from '../components/FeaturesContainer';
import Footer from '../components/Footer';
import TextContainer from '../components/TextContainer';

const HomeScreen = () => {
  const history = useHistory();
  const { loading } = useContext(UserContext);
  const [pageLoading, setPageLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [err, setErr] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (!loading) setPageLoading(false);
  });

  useEffect(() => {
    if (err) {
      toast({
        title: 'Error',
        description: 'Could not find a active process with that key!',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      setErr(false);
    }
  }, [err]);

  const searchId = (key) => {
    setSearchLoading(true);
    const rootRef = db.ref();
    let flag = 0;
    rootRef.on('value', (snapshot) => {
      snapshot.forEach((child) => {
        if (child.key === key) {
          flag = 1;
        }
        setSearchLoading(false);
      });
      if (!flag) setErr(true);
      else { history.push(`/logs/${key}`); }
    });
  };

  if (pageLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Container
      w="100%"
      maxW="100vw"
      paddingInlineEnd="0"
      paddingInlineStart="0"
      color="white"
      minH="100vh"
      className="home-screen"
    >
      <HeroContainer searchId={searchId} searchLoading={searchLoading} />
      <TextContainer />
      <FeaturesContainer />
      <Footer />
    </Container>
  );
};

export default HomeScreen;

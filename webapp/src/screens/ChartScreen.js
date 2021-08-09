import React, {
  useContext, useState, useEffect,
} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { VStack, Text } from '@chakra-ui/react';

import { UserContext } from '../providers/AuthProvider';
import { db, redirectWithGoogle } from '../firebase/Firebase';

import LoadingSpinner from '../components/LoadingSpinner';
import ChartsContainer from '../components/ChartsContainer';

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
    <VStack>
      <Text fontSize="2xl" marginTop="4" fontWeight="semibold" color="gray.600">Real-time logs</Text>
      <ChartsContainer data={logs} />
    </VStack>
  );
};

export default ChartScreen;

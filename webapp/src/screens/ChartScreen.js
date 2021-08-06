import React, {
  useContext, useState, useEffect,
} from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import {
  VStack, Text, Spinner,
} from '@chakra-ui/react';

import { UserContext } from '../providers/AuthProvider';
import { db } from '../firebase/Firebase';
import LineChartComponent from '../components/LineChartComponent';

const ChartScreen = () => {
  const { id } = useParams();
  const history = useHistory();
  const { user, loading } = useContext(UserContext);
  const [logs, setLogs] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

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
    return (
      <VStack marginTop="10">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="teal.400"
          size="xl"
        />
      </VStack>
    );
  }

  return (
    <>
      { !loading && !user ? (
        <Redirect to="/" />
      ) : (
        <VStack>
          <Text fontSize="3xl">Chart screen</Text>
          <LineChartComponent logs={logs} />
        </VStack>
      )}
    </>
  );
};

export default ChartScreen;

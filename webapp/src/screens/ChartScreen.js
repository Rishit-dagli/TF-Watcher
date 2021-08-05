import React, {
  useContext, useState, useEffect,
} from 'react';
import { Redirect } from 'react-router-dom';
import {
  VStack, Text,
} from '@chakra-ui/react';

import { UserContext } from '../providers/AuthProvider';
import { db } from '../firebase/Firebase';
import LineChartComponent from '../components/LineChartComponent';

const ChartScreen = () => {
  const { user, loading } = useContext(UserContext);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    db.ref('jGNGTBd').on('value', (snapshot) => {
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

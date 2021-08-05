import React, {
  useContext, useState, useEffect,
} from 'react';
import { Redirect } from 'react-router-dom';
import {
  VStack, Text,
} from '@chakra-ui/react';

import { UserContext } from '../providers/AuthProvider';
import { db } from '../firebase/Firebase';

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

  // eslint-disable-next-line no-console
  console.log(logs);

  return (
    <>
      { !loading && !user ? (
        <Redirect to="/" />
      ) : (
        <VStack>
          <Text fontSize="3xl">Chart screen</Text>
        </VStack>
      )}
    </>
  );
};

export default ChartScreen;

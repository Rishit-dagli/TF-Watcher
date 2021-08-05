/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, { useState, useEffect, createContext } from 'react';
import { auth } from '../firebase/Firebase';

export const UserContext = createContext();

export default (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { children } = props;

  useEffect(() => {
    auth.onAuthStateChanged((currentUser) => {
      if (currentUser) setUser(currentUser);
      setLoading(false);
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>{children}</UserContext.Provider>
  );
};

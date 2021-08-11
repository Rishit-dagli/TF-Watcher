import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

firebase.initializeApp({
  apiKey: 'AIzaSyAfCOOzFtKxTa-_pS3lO6URRGR8sVjK7sk',
  authDomain: 'tf-watcher.firebaseapp.com',
  databaseURL: 'https://tf-watcher-default-rtdb.firebaseio.com/',
  projectId: 'tf-watcher',
});

export const auth = firebase.auth();
export const db = firebase.database();

const googleProvider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    await auth.signInWithPopup(googleProvider);
  } catch {
    return false;
  }
  return true;
};

export const redirectWithGoogle = () => {
  auth.signInWithRedirect(googleProvider);
};

export const logOut = async () => {
  try {
    await auth.signOut();
  } catch {
    return false;
  }
  return true;
};

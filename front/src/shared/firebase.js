import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDzso2zaGiat_YYrH0PFi2Y7Grhxf9OXkk",
  authDomain: "imgcommunity-46e15.firebaseapp.com",
  databaseURL: "https://imgcommunity-46e15-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "imgcommunity-46e15",
  storageBucket: "imgcommunity-46e15.appspot.com",
  messagingSenderId: "88009085502",
  appId: "1:88009085502:web:b79dd8f4407945f393b76f",
  measurementId: "G-SJM3XP072F"
};

firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
const realtime = firebase.database();

export { auth, apiKey, firestore, storage, realtime };
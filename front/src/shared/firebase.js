import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDzso2zaGiat_YYrH0PFi2Y7Grhxf9OXkk",
  authDomain: "imgcommunity-46e15.firebaseapp.com",
  projectId: "imgcommunity-46e15",
  storageBucket: "imgcommunity-46e15.appspot.com",
  messagingSenderId: "88009085502",
  appId: "1:88009085502:web:b79dd8f4407945f393b76f",
  measurementId: "G-SJM3XP072F"
};

firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();

export { auth, apiKey };
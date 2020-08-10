  import firebase from 'firebase'
  // import firestore from 'firebase/firestore'
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDvr6PFQZVQ09kS9J-qcS1-mtccKULe9eY",
    authDomain: "my-trivia-game-90639.firebaseapp.com",
    databaseURL: "https://my-trivia-game-90639.firebaseio.com",
    projectId: "my-trivia-game-90639",
    storageBucket: "my-trivia-game-90639.appspot.com",
    messagingSenderId: "977151032404",
    appId: "1:977151032404:web:1fa45e473a96928e6a41c1"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  // export firestore database
  export default firebaseApp.firestore()
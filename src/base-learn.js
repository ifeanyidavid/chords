import Rebase from "re-base";
import firebase from "firebase";

const config = {
  apiKey: "AIzaSyCEe67HdZ9qrhVH3Pb_zbiUtjNR1P3CS58",
  authDomain: "chord-creator-f9a11.firebaseapp.com",
  databaseURL: "https://chord-creator-f9a11.firebaseio.com",
  projectId: "chord-creator-f9a11",
  storageBucket: "chord-creator-f9a11.appspot.com",
  messagingSenderId: "358560391797"
};

const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database());
const facebookProvider = new firebase.auth.FacebookAuthProvider();

export { app, base, facebookProvider };

import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.Config";

const intFirebaseAuthentication = () => {
    initializeApp(firebaseConfig);
};
export default intFirebaseAuthentication;
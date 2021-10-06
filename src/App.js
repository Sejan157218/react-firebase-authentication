import logo from './logo.svg';
import './App.css';
import intFirebaseAuthentication from './Firebase/firebase.init';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';



intFirebaseAuthentication()

function App() {
  const [eamil, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const auth = getAuth();
  const handlerToGoogleSign = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then((result) => {

        const user = result.user;
        console.log(user);

      }).catch((error) => {

        console.log(error.code);

      });
  }


  const handlerToEmail = e => {
    setEmail(e.target.value)
  }
  const handlerToPassword = e => {

    setPassword(e.target.value)

  }
  const handlerToSubmit = e => {
    e.preventDefault();
    // if (password.length < 6) {
    //   setError('Password should be at least 6 characters')
    //   return;
    // }
    if (!/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{7,}$/.test(password)) {
      setError('Password should be at least 1 upper case 1 lower case 1 digit 8 characters')
      return;
    }
    createUserWithEmailAndPassword(auth, eamil, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setError('')
      })

    console.log(eamil, password);

  }


  return (
    <div className="container ms-5">

      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input onBlur={handlerToEmail} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input onBlur={handlerToPassword} type="password" className="form-control" id="exampleInputPassword1" />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <h1 className="danger">{error}</h1>
        <button onClick={handlerToSubmit} type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
}

export default App;

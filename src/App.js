import logo from './logo.svg';
import './App.css';
import intFirebaseAuthentication from './Firebase/firebase.init';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';



intFirebaseAuthentication()

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const [isLogin, setIsLogin] = useState(false);
  const auth = getAuth();
  console.log(isLogin);
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

    isLogin ? loginUser(email, password) : createNewUser(email, password)

  }
  const loginUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {

        const user = userCredential.user;
        console.log(user);
        setError('you are succesfuly login in ')

      })
      .catch((error) => {
        setError(error.message)
      });
  }

  const createNewUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setError('')
      })
      .catch((error) => {
        setError(error.message)
      });
  }



  const handlerToToggle = e => {
    setIsLogin(e.target.checked)
  }

  return (
    <div className="container ms-5">
      <h1>{isLogin ? "Please Login" : "Please register"}</h1>
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
          <input onClick={handlerToToggle} type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Already sign in</label>
        </div>
        <h1 className="danger">{error}</h1>
        <button onClick={handlerToSubmit} type="submit" className="btn btn-primary">{isLogin ? "Login" : "Register"}</button>
      </form>
    </div>
  );
}

export default App;

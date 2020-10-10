/*
*/

import React,{useState} from 'react';
import * as ROUTES from "./app/routes";
import {Link, withRouter, useHistory} from "react-router-dom"
import { FirebaseContext } from '../firebase';

const INITIAL_STATE = {
  email: '',
  passwordOne: '',
  error: null,
};
const SignInPage = (props) => {
  return (
    <div>
    <h1>SignIn</h1>
    <SignInForm/>
  </div>
  )
}
const SignInFormBase = (props)=>{
  const history = useHistory();
  const [email,setEmail] = useState('');
  const [passOne,setPassOne] = useState('');
  const [error,setError] = useState(null);
  let isInvalid =  passOne === '' ||  email === '';
  const onSubmit = event => {
    event.preventDefault();
      props.firebase.signIn(email, passOne)
        setEmail(INITIAL_STATE.email);
        setPassOne(INITIAL_STATE.passwordOne);
        setError(INITIAL_STATE.error);
      history.push(ROUTES.HOME);
  };
  
  const onChange = event => {
    if (event.target.name === "email"){
      setEmail(event.target.value);
    }
    else if (event.target.name === "password"){
      setPassOne(event.target.value);
    }
  };
  return (
            <>
        <input
          name="email"
          value={email}
          onChange={onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="password"
          value={passOne}
          onChange={onChange}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit" onClick={onSubmit}>
          Sign In
        </button>
 
        {error && <p>{error.message}</p>}
      </>
    );
}
const SignInForm = withRouter(()=>{
    return(
      <FirebaseContext.Consumer>
        {firebase => <SignInFormBase firebase={firebase} />}
      </FirebaseContext.Consumer>)})
const SignInLink = (props)=>{
  return (
    <>
    <p>already have an account?<Link to={ROUTES.SIGN_IN}>Sign in</Link></p>
    </>
  )
}
export default SignInPage;
export {SignInForm,SignInLink};
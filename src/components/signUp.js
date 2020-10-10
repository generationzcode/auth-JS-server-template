import React,{useState} from 'react';
import * as ROUTES from "./app/routes";
import {Link, withRouter,  useHistory} from "react-router-dom"
import { FirebaseContext } from '../firebase';

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};
 
const SignUpPage = (props) => {
  return (
    <div>
    <h1>SignUp</h1>
    <SignUpForm/>
  </div>
  )
}
const SignUpForm = withRouter(()=>{
    return(
      <FirebaseContext.Consumer>
        {firebase => <SignUpFormBase firebase={firebase} />}
      </FirebaseContext.Consumer>)})
const SignUpFormBase = (props)=>{
  const history = useHistory();
   const [user,setUser] = useState(INITIAL_STATE.username);
  const [email,setEmail] = useState(INITIAL_STATE.email);
  const [passOne,setPassOne] = useState(INITIAL_STATE.passwordOne);
  const [passTwo,setPassTwo] = useState(INITIAL_STATE.passwordTwo);
  const [error,setError] = useState(INITIAL_STATE.error);
  const isInvalid = passOne !== passTwo || passOne === '' ||  email === '' || user === '';
  const onSubmit = event => {
    event.preventDefault();
    props.firebase.signUp(email, passOne).then(()=>{
        setUser(INITIAL_STATE.username);
        setEmail(INITIAL_STATE.email);
        setPassOne(INITIAL_STATE.passwordOne);
        setPassTwo(INITIAL_STATE.passwordTwo);
        setError(INITIAL_STATE.error);
        props.firebase.auth.onAuthStateChanged(username => {
        props.firebase.user(username.uid).set({user,email});
    });
    })
      history.push(ROUTES.HOME);
      
        }

  const onChange = event => {
    if (event.target.name === "username"){
      setUser(event.target.value);
    }
    else if (event.target.name === "email"){
      setEmail(event.target.value);
    }
    else if (event.target.name === "passwordOne"){
      setPassOne(event.target.value);
    }
    else if (event.target.name === "passwordTwo"){
      setPassTwo(event.target.value);
    }
  };
  return (
      <>
        <input
          name="username"
          value={user}
          onChange={onChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          value={email}
          onChange={onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={passOne}
          onChange={onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passTwo}
          onChange={onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <button type="submit" disabled={isInvalid} onClick={onSubmit}>Sign Up</button>
 
        {error && <p>{error.message}</p>}
      </>
    );
}
const SignUpLink = (props)=>{
  return (
    <>
    <p>dont have an acount?<Link to={ROUTES.SIGN_UP}>Sign up</Link></p>
    </>
  )
}
export default SignUpPage;
export {SignUpForm,SignUpLink};
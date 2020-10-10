import React, { useState } from 'react';
import { BrowserRouter as Router ,Route} from 'react-router-dom';
import {AuthUserContext} from '../session';
import Navigation from './nav';
import LandingPage from '../landing';
import SignUpPage from '../signUp';
import SignInPage from '../signIn';
import SignOutPage from '../signOut';
import PasswordForgetPage from '../passwordForget';
import HomePage from '../home';
import AccountPage from '../account';
import AdminPage from '../admin';
import * as ROUTES from './routes';
import {FirebaseContext} from '../../firebase';
const App = (props) => {

  const [authUser,setAuthUser] = useState(null);
  props.firebase.auth.onAuthStateChanged(
        authUser => {
          setAuthUser(authUser);
        }
      )
  return (
    <AuthUserContext.Provider value={authUser}>
    <Router>
    <div>
      <Navigation authUser={authUser}/>
      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
    </div>
  </Router>
  </AuthUserContext.Provider>
  );
};
 
export default ()=><FirebaseContext.Consumer>
        {firebase => <App firebase={firebase} />}
      </FirebaseContext.Consumer>;
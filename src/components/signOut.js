import React from 'react';
import {FirebaseContext} from '../firebase'
 
const SignOutButton = ({ firebase }) => (
  <button type="button" onClick={firebase.signOut}>
    Sign Out
  </button>
);
 
export default ()=>(<FirebaseContext.Consumer>
        {firebase => <SignOutButton firebase={firebase} />}
      </FirebaseContext.Consumer>);
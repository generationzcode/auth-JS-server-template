import React from 'react';
import {FirebaseContext} from '../../firebase';
import AuthUserContext from './context';
 
const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);
 
      this.state = {
        authUser: null,
      };
    }
 
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          authUser
            ? this.setState({ authUser })
            : this.setState({ authUser: null });
        },
      );
    }
 
    componentWillUnmount() {
      this.listener();
    }
 
    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }
 
  return (
      <FirebaseContext.Consumer>
        {firebase => <WithAuthentication firebase={firebase} />}
      </FirebaseContext.Consumer>);
};
 
export default withAuthentication;
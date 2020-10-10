import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/app';
import Firebase,{ FirebaseContext } from './firebase';
import * as serviceWorker from './serviceWorker';
ReactDOM.render(  <FirebaseContext.Provider value={new Firebase()}>
  <App/>
  </FirebaseContext.Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
import firebase  from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

var firebaseConfig = {
    apiKey: "AIzaSyCT8u5wdkkqRAdcp2R4zr109Ja1JnNWzfc",
    authDomain: "dronesrcuul.firebaseapp.com",
    databaseURL: "https://dronesrcuul.firebaseio.com",
    projectId: "dronesrcuul",
    storageBucket: "dronesrcuul.appspot.com",
    messagingSenderId: "905401085638",
    appId: "1:905401085638:web:7c15156d51274df74771c7",
    measurementId: "G-J8PML2NB5B"
  };
  // Initialize Firebase

class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.auth = firebase.auth();
    this.db = firebase.database();
  }
  readData(ref,ref2,callback){
    /*
    var userId = firebase.auth().currentUser.uid;
    return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
    var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
});

    */
    return firebase.database().ref(ref + ref2).once('value').then(callback);
  }
  writeData(ref,ref2,obj) {
    //ref = 'users/' ref2 = '123'
  this.db.ref(ref + ref2).set(obj);
  }
  signIn(email,pass){
    this.auth.signInWithEmailAndPassword(email, pass);
  }
  async signUp(email, password){
    await this.auth.createUserWithEmailAndPassword(email, password);
  }
  signOut(){
    firebase.auth().signOut();
  }
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
 
  doPasswordUpdate = password =>{
    this.auth.currentUser.updatePassword(password);
  }
  user(uid){
    return this.db.ref(`users/${uid}`);
  }
  users() { 
    return this.db.ref('users');
  }
  /*game(xcoord,ycoord){
    return readData('game/',toString(xcoord)+toString(ycoord));
  }*/
  /*regGame(name,blocks,lava,portals,extra,version){
    var max_y_coord = 0;
    var max_x_coord = 0;
    this.readData('maxcoord/','',function(snap){
      max_x_coord = parseInt(snap.val().x)
      max_y_coord = parseInt(snap.val().y)
    })
    var cur_x_coord = 0;
    var cur_y_coord = 0;
    if (max_y_coord< 100){
      cur_y_coord = max_y_coord+1;
      cur_x_coord = max_x_coord;
    }
    else{
      cur_y_coord = 0
      cur_x_coord = max_x_coord+1
    }
    this.writeData('game/',+)
  }*/
}
 
export default Firebase;

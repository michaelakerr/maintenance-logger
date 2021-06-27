import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

var firebaseConfig = {
    apiKey: "AIzaSyBUxEUulVN8GHHZp0fNs1V8JVEUnB_QQpU",
    authDomain: "quail-logger.firebaseapp.com",
    projectId: "quail-logger",
    storageBucket: "quail-logger.appspot.com",
    messagingSenderId: "148954121444",
    appId: "1:148954121444:web:6be5419589ee6adaeb18f1",
    measurementId: "G-R1JLGEWX6Y"
  };


class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.db = app.database();
    }
    user = uid => this.db.ref(`users/${uid}`);
    users = () => this.db.ref('users');
    addShedQuery = (uid, shed_query) => {
      //  let ref = this.db.ref().child(`users/${uid}/shed_query`);
       // ref.push(shed_query);
        let newRef = this.db.ref().child(`queries`);
        newRef.push(shed_query)
        }
        
    listofShedQueries = (shed_query) => {
        const ref = this.db.ref('queries');
        ref.push(shed_query);
    }
    updateShedQuery = (uid, shedQuery, shedQueryKey) => {
        let ref = this.db.ref().child(`users/${uid}/shed_queries/${shedQueryKey}`);
        ref.update(shedQuery);
        let newRef = this.db.ref().child(`queries/${shedQueryKey}`);
        newRef.update(shedQuery);
    }
    /*** Authentication  ***/
    doCreateUserWithEmailAndPassword = (email, password) => 
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) => 
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => 
        this.auth.signOut();

    doPasswordReset = email => 
        this.auth.sendPasswordResetEmail(email);
}

export default Firebase;
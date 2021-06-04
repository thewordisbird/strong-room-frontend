import firebase from '../firebase';
import 'firebase/auth';

const auth = firebase.auth();

function loginUser(
  email: string,
  password:string,
): Promise<void | firebase.User> {
  return auth.signInWithEmailAndPassword(email, password)
    .then((userCredentials) => {
      const { user } = userCredentials;
      return user as firebase.User;
    })
    .catch((error) => {
      let message = '';

      switch (error.code) {
        case 'auth/invalid-email':
          message = 'Invalid email address.';
          break;
        case 'auth/user-not-found':
          message = 'Invalid user.';
          break;
        case 'auth/wrong-password':
          message = 'Invalid password.';
          break;
        default:
          message = 'Unknown Authentication Error.';
      }
      throw (message);
    });
}

function logoutUser(): Promise<void> {
  return auth.signOut()
    .then(() => {
      localStorage.clear();
    });
}

function authCheckState():Promise<firebase.User | void> {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        resolve(user);
      } else {
        reject();
      }
    });
  });
}

export { loginUser, logoutUser, authCheckState };

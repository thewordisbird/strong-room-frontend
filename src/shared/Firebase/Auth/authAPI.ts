import firebase from '../firebase';
import 'firebase/auth'
const auth = firebase.auth()

export const loginUser = (email: string, password: string): Promise<firebase.User | null> => {
    return auth.signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
            // User Logged In
            const user = userCredentials.user
            if (user) {
              user.getIdTokenResult().then(tokenResult => {
                const token = tokenResult.token;
                const tokenExp = tokenResult.expirationTime
                localStorage.setItem('sr-token', token);
                localStorage.setItem('sr-tokenExp', tokenExp);
                localStorage.setItem('sr-userId', user.uid)
              })
            }
            return user
          }
      )
      .catch(error => {
        let message = '';
        
        switch (error.code) {
          case 'auth/invalid-email':
            message = "Invalid email address.";
            break;
          case 'auth/user-not-found':
            message = "Invalid user."
            break;
          case 'auth/wrong-password':
            message = 'Invalid password.';
            break;
          default:
            message = "Unknown Authentication Error."
        }

        console.log('catch error', error.code, message)
        throw new Error(message);
      })
  }

  export const logoutUser = () => {
    return auth.signOut()
      .then(() => {
        localStorage.clear()
      }
    )
  }

  export const autoLogin = () => {
    // If there is user information in local storage,
    //  - check the token and expiration
    //  - issue new token
    //  - update local storage cookies
    //  - login user
  }

  export const autoLogout = () => {
    // used by interceptor middlewear to confirm user is valid for any request
  }

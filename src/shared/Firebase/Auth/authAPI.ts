import firebase from '../firebase';
import 'firebase/auth'
const auth = firebase.auth()

export const loginUser = (email: string, password: string): Promise<firebase.User | null> => {
    return auth.signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
            // User Logged In
            const user = userCredentials.user
            if (user) {
              setUser(user)
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

  export const authCheckState = ( stateSetter: (user: firebase.User | null) => void) => {
    return auth.onAuthStateChanged(async(user) => {
      if (user) {
        setUser(user)
        stateSetter(user)
      } else {
        await logoutUser()
      }
    })
  }

  const setUser = (user: firebase.User): void => {
    user.getIdTokenResult().then(tokenResult => {
      const token = tokenResult.token;
      const tokenExp = tokenResult.expirationTime
      localStorage.setItem('sr-token', token);
      localStorage.setItem('sr-tokenExp', tokenExp);
      localStorage.setItem('sr-userId', user.uid)
    })
  }

  
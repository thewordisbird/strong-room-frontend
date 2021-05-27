import firebase from '../firebase';
import 'firebase/auth'
const auth = firebase.auth()

export const loginUser = (email: string, password: string): Promise<void> => {

    return new Promise(async (resolve, reject) => {
      try {
        const userCredentials = await auth.signInWithEmailAndPassword(email, password)
        const user = userCredentials.user
        if (user) {
          setUser(user)
          resolve()
        }
      } catch (error) {
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

        reject(message)
      }
    })
  }

  export const logoutUser = () => {
    return auth.signOut()
      .then(() => {
        localStorage.clear()
      }
    )
  }

  export const authCheckState = ():Promise<firebase.User | void> => {
    // TODO: convert to promise
    return new Promise((resolve, reject) => {
      auth.onAuthStateChanged(user => {
        if (user) {
          resolve(user)
        } else {
          reject()
        }
      })
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

  
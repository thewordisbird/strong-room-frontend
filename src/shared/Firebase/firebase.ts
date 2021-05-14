import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

import firebaseConfig from './config/firebaseConfig'

export interface InvoiceData {
  id?: string;
  " AvidPay Check #": string;
  " Cash Account": string;
  " Cleared Date": string;
  " Delivery Method": string;
  " Delivery Status": string;
  " G/L Amount": string;
  " Invoice Count": string;
  " Last Update Date": string;
  " Pay TransactionId": string;
  " Payment Amount": string;
  "Bank Account": string;
  "Check": string;
  "Code": string;
  "Company": string;
  "Date Paid": string;
  "G/L Account": string;
  "Invoice Amount": string;
  "Invoice Id": string;
  "Invoice Num": string;
  "Vendor": string;
  "checkStubNote": string;
  "dueDate": string;
  "internalNote": string;
  "invoiceDate": string;
  "pdfId": string;
  "topsRef": string;
  "trxnDate": string;
}

const converter = {
  toFirestore: (data: InvoiceData) => data,
  fromFirestore: (snapshot: app.firestore.QueryDocumentSnapshot) => snapshot.data() as InvoiceData
}

class Firebase {
  

  auth: app.auth.Auth;
  
  firestore: app.firestore.Firestore;
  invoiceCollection: app.firestore.CollectionReference;
  
  storage: app.storage.Storage;
  sotragePathRef: app.storage.Reference;

  constructor() {
    app.initializeApp(firebaseConfig);

    this.auth = app.auth();

    this.firestore = app.firestore();
    this.invoiceCollection = this.firestore.collection('invoice')

    this.storage = app.storage()
    this.sotragePathRef = this.storage.ref()
  }

  // *** Auth API ***
  loginUser(email: string, password: string) {
    console.log('in loginuser')
    return this.auth.signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
            // User Logged In
            const user = userCredentials.user
            if (user) {
              user.getIdTokenResult().then(tokenResult => {
                const token = tokenResult.token;
                const tokenExp = tokenResult.expirationTime
                localStorage.setItem('token', token);
                localStorage.setItem('tokenExp', tokenExp);
                localStorage.setItem('userId', user.uid)
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

  // *** Firestore API ***
  // To work with material-ui pagination the entire dataset is fetched and manipulated locally
  getInvoices(){
    return this.invoiceCollection.withConverter(converter)
      .get()
      .then((snapshot) => {
        const results = snapshot.docs.map(doc => {
          const invoice = doc.data()
          return {...invoice, id: doc.id}
        });
        return results
      })
      .catch(error => console.log(error))
  }

  getVendors = () =>  {
    return this.invoiceCollection.get().then(querySnapshot => {
      const uniqueVendors = new Set<string>()
      querySnapshot.forEach(doc => {
        uniqueVendors.add(doc.data()['Vendor'])
      }) 
      return uniqueVendors     
    })
    .catch(error => {
      console.log('firebase error', error)
      // Return an empty set
      return new Set<string>()
    })
  }

  getInvoice = (id: string) => {
    return this.invoiceCollection.doc(id).withConverter(converter).get()
      .then(snapShot => {
        const invoiceData = snapShot.data() 
        return {...invoiceData, id: snapShot.id} as InvoiceData
      })
  }

  // *** Storage API ***
  getPdfUrl = (invoiceId: string) => {
    const storageRef = this.sotragePathRef.child(invoiceId)

    return storageRef.getDownloadURL()
      .then(url => url)
      .catch(error => console.log('storage error', error))
  }
}

export default Firebase;
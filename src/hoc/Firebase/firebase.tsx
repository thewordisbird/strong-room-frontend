import app from 'firebase/app';
import 'firebase/firestore';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
}

class Firebase {
  firestore: app.firestore.Firestore;
  invoiceCollection: app.firestore.CollectionReference;
  vendors: Invoice[] = [];

  constructor() {
    app.initializeApp(config);

    this.firestore = app.firestore();
    this.invoiceCollection = this.firestore.collection('invoice')
  }

  // *** Firestore API ***
  getVendors = () => {
    console.log('[Firebase, getVendors, invoiceCOllection]', this.invoiceCollection)
    return this.invoiceCollection.get()
    .then(querySnapshot => {
      console.log('[Firebase, getVendors, querySnapshot]', querySnapshot)
      const uniqueVendors = new Set<string>()
      querySnapshot.forEach(doc => {
        uniqueVendors.add(doc.data()['Vendor'])
      }) 
      return uniqueVendors     
    })
    .catch(error => console.log('firebase error', error))
  }

  getInvoiceData = (queryParams: {vendor?: string, startDate?:Date, endDate?:Date}) => {
    console.log('[Firebase, getInvoiceData, queryParams]', queryParams)
    let invoiceQuery: app.firestore.CollectionReference<app.firestore.DocumentData> | app.firestore.Query<app.firestore.DocumentData> = this.invoiceCollection
    for (const param in queryParams) {
      console.log('checking param', param)
      switch (param) {
        case 'vendor':
          invoiceQuery = queryParams['vendor'] 
            ? invoiceQuery.where('Vendor', '==', queryParams['vendor'])
            : invoiceQuery
          break;
        case 'startDate':
          // invoiceQuery = queryParams['startDate'] 
          //   ? invoiceQuery.where('invoiceDate', '>=', queryParams['startDate'])
          //   : invoiceQuery
          break;
        case 'endDate':
          // invoiceQuery = queryParams['endDate']
            // ? invoiceQuery.where('invoiceDate', '<=', queryParams['endDate'])
            // : invoiceQuery
          break;
      }
    }
    return invoiceQuery.limit(25).get()
      .then(querySnapshot => {
        return querySnapshot.docs
      })
  }

  
}

interface Invoice {
  "Pay TransactionId": string;
  "Payment Amount": string;
  "Bank Account": string;
  "Check": string;

}
export default Firebase;
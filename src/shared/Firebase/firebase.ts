import app from 'firebase/app';
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
  firestore: app.firestore.Firestore;
  invoiceCollection: app.firestore.CollectionReference;
  vendors: Invoice[] = [];
  lastQuery: app.firestore.CollectionReference<app.firestore.DocumentData> | app.firestore.Query<app.firestore.DocumentData>;
  storage: app.storage.Storage;
  sotragePathRef: app.storage.Reference;

  constructor() {
    app.initializeApp(firebaseConfig);

    this.firestore = app.firestore();
    this.invoiceCollection = this.firestore.collection('invoice')
    this.lastQuery = this.invoiceCollection;

    this.storage = app.storage()
    this.sotragePathRef = this.storage.ref()
  }

  // *** Firestore API ***
  // Because this is a realtively small dataset that is read only and will never be updated, Only one databse query is made when the application is loaded.
  // The data will be stored in an object in local memory and any sort and filtering operations will be performed locally.
  loadInvoices(){
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

  // getInvoiceData = (queryParams: {vendor?: string, startDate?:Date, endDate?:Date}, pagination: {page?: number, rowsPerPage?: number}) => {
  //   console.log('[Firebase, getInvoiceData, queryParams]', queryParams)
  //   // let invoiceQuery: app.firestore.CollectionReference<app.firestore.DocumentData> | app.firestore.Query<app.firestore.DocumentData> = this.invoiceCollection
  //   for (const param in queryParams) {
  //     console.log('checking param', param)
  //     switch (param) {
  //       case 'vendor':
  //         this.lastQuery = queryParams['vendor'] 
  //           ? this.lastQuery.where('Vendor', '==', queryParams['vendor'])
  //           : this.lastQuery
  //         break;
  //       case 'startDate':
  //         // invoiceQuery = queryParams['startDate'] 
  //         //   ? invoiceQuery.where('invoiceDate', '>=', queryParams['startDate'])
  //         //   : invoiceQuery
  //         break;
  //       case 'endDate':
  //         // invoiceQuery = queryParams['endDate']
  //           // ? invoiceQuery.where('invoiceDate', '<=', queryParams['endDate'])
  //           // : invoiceQuery
  //         break;
  //     }
  //   }
    
  //   const limit = pagination.rowsPerPage as number
  //   return this.lastQuery.limit(limit).get()
  //     .then(querySnapshot => {
  //       return querySnapshot.docs
  //     })
  // }

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

interface Invoice {
  "Pay TransactionId": string;
  "Payment Amount": string;
  "Bank Account": string;
  "Check": string;

}
export default Firebase;
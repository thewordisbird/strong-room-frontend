import firebase from '../firebase';
import 'firebase/firestore';
import { InvoiceData } from './interfaces/InvoiceData';

const firestore = firebase.firestore();
const invoiceCollection = firestore.collection('invoice');

const typeConverter = {
  toFirestore: (data: InvoiceData) => data,
  fromFirestore: (snapshot: firebase.firestore.QueryDocumentSnapshot) => snapshot.data() as InvoiceData,
};

function getInvoices(): Promise<void | InvoiceData[]> {
  return invoiceCollection.withConverter(typeConverter)
    .get()
    .then((snapshot) => {
      // Add id to snapshot data to return invoice data with doc id
      const results: InvoiceData[] = snapshot.docs.map((doc) => {
        const invoice = doc.data();
        return { ...invoice, id: doc.id };
      });
      return results;
    })
    .catch((error) => {
      // TODO: handle errors
      throw (error);
    });
}

function getInvoice(id: string): Promise<InvoiceData> {
  return invoiceCollection.doc(id).withConverter(typeConverter)
    .get()
    .then((snapshot) => {
      const invoice = snapshot.data();
      return { ...invoice, id: snapshot.id } as InvoiceData;
    });
}

export { getInvoices, getInvoice };

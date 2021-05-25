import firebase from '../firebase';
import 'firebase/storage';

const storage = firebase.storage()
const storagePathRef = storage.ref()

export const getPdfUrl = (invoiceId: string): Promise<void | string> => {
  const storageRef = storagePathRef.child(`${invoiceId}.pdf`)

  return storageRef.getDownloadURL()
    .then((url: string )=> url)
    .catch(error => console.log('storage error', error))
}


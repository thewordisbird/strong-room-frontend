import firebase from '../firebase';
import 'firebase/storage';

const storage = firebase.storage();
const storagePathRef = storage.ref();

function getPdfUrl(invoiceId: string): Promise<void | string> {
  const storageRef = storagePathRef.child(`${invoiceId}.pdf`);

  return storageRef.getDownloadURL()
    .then((url: string) => url)
    .catch((error) => {
      throw (error);
    });
}

export { getPdfUrl };

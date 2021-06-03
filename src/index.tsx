import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import Firebase, { FirebaseContext } from './shared/Firebase';
// import { AuthProvider } from './shared/Firebase/Auth/AuthProvider';
import {FirestoreProvider} from './shared/Firebase/Firestore/FirestoreProvider'
import { StorageProvider } from './shared/Firebase/Storage/StorageProvider';
import { AuthProvider } from './shared/Firebase/Auth/AuthProvider';

ReactDOM.render(
  <React.StrictMode>
    <FirestoreProvider>
      <StorageProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </StorageProvider>
    </FirestoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

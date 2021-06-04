import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  FirestoreProvider,
} from './shared/Firebase/Firestore/FirestoreProvider';
import { AuthProvider } from './shared/Firebase/Auth/AuthProvider';

ReactDOM.render(
  <React.StrictMode>
    <FirestoreProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </FirestoreProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

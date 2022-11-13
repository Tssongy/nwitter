// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './components/App';
// // import firebase from "firebase/compat/app";
// // import app from "./firebase";
// // console.log(firebase)
// // console.log(app)

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./components/App";

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);

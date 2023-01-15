import React, { useEffect, useState } from "react";
import AppRouter from "./Router";

import { onAuthStateChanged, getAuth } from "firebase/auth";
import { authService } from "../fbase";
// console.log(authService)

function App() {
  const auth = getAuth();
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  // setInterval(() => {
  //   console.log(auth.currentUser)
  // }, 2000);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user){
        setIsLoggedIn(true)
        console.log("user: ", user)
        const uid = user.uid;
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
        });
      }
      else {
        setIsLoggedIn(false);
      }
      setInit(true)
    })
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
    });
  }

  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} refreshUser={refreshUser}/> : "Initializing"}
      {/* <footer>&copy; {new Date().getFullYear()} Nwitter</footer> */}
    </>
  );
}

export default App;

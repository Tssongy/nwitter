import React, { useEffect, useState } from "react";
import AppRouter from "./Router";

// import { authService } from "../fbase"
import { onAuthStateChanged, getAuth } from "firebase/auth";
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
        setUserObj(user);
      }
      else {
        setIsLoggedIn(false);
      }
      setInit(true)
    })
  }, [])

  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/> : "Initializing"}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;

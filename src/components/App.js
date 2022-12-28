import React, { useEffect, useState } from "react";
import AppRouter from "./Router";

// import { authService } from "../fbase"
import { onAuthStateChanged, getAuth } from "firebase/auth";
// console.log(authService)

function App() {
  const auth = getAuth();
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // setInterval(() => {
  //   console.log(auth.currentUser)
  // }, 2000);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user){
        setIsLoggedIn(true)
        console.log("user: ", user)
        const uid = user.uid;
      }
      else {
        setIsLoggedIn(false);
      }
      setInit(true)
    })
  }, [])

  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn}/> : "Initializing"}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;

import React, { useState } from "react";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    } from 'firebase/auth';

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
        const { name, value } = event.target
        if(name === "email"){
            setEmail(value)
        }
        else if(name === "password"){
            setPassword(value)
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if(newAccount){
            // create account
            try {
                let data;
                const auth = getAuth();
                if(newAccount){
                    data = await createUserWithEmailAndPassword(auth, email, password)
                }
                else {
                    data = await signInWithEmailAndPassword(auth, email, password);
                }
                console.log(data)
            } catch (error) {
                console.log(error)
                setError(error.message)
            }
        }
    }

    const toggleAccount = () => setNewAccount((prev) => !prev);
    return (
        <>
            <form onSubmit={onSubmit}>
                <input 
                    name="email" 
                    type="text" 
                    placeholder="Email" 
                    value={email} 
                    onChange={onChange} 
                    required 
                />
                <input 
                    name="password" 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={onChange} 
                    required 
                />
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
                {error}
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Sign in" : "Create Account"}</span>    
        </>
        
    )
};

export default AuthForm
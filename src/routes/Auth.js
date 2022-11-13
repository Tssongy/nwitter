import React, { useState } from "react";
import { authService } from "../fbase";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    GithubAuthProvider,
    GoogleAuthProvider,
    signInWithPopup
    } from 'firebase/auth';

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("")

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

    const onSocialClick = async (event) => {
        const {target: { name }} = event
        let provider;
        try {
            if(name === 'google'){
                provider = new GoogleAuthProvider();
            }
            else if (name === "github"){
                provider = new GithubAuthProvider();
            }
            const data = await signInWithPopup(authService, provider);
            console.log('social log in data is: ', data)
        } catch (e) {
            console.log(e)
        }
        
    }

    return (
        <div>
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
            <div>
                <button name="google" onClick={onSocialClick}>Continue with Google</button>
                <button name="github" onClick={onSocialClick}>Continue with Github</button>
            </div>
        </div>
    )
};
export default Auth;
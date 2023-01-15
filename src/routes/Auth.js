import React from "react";
import { authService } from "../fbase";
import {
    GithubAuthProvider,
    GoogleAuthProvider,
    signInWithPopup
    } from 'firebase/auth';
import AuthForm from "../components/AuthForm";

const Auth = () => {
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
    };

    return (
        <div>
            <AuthForm />
            <div>
                <button name="google" onClick={onSocialClick}>Continue with Google</button>
                <button name="github" onClick={onSocialClick}>Continue with Github</button>
            </div>
        </div>
    )
};
export default Auth;
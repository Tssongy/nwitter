import React from "react";
import { authService } from "../fbase";
import {
    GithubAuthProvider,
    GoogleAuthProvider,
    signInWithPopup
    } from 'firebase/auth';
import AuthForm from "../components/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

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
    
        <div className="authContainer">
            <FontAwesomeIcon
                icon={faTwitter}
                color={"#04AAFF"}
                size="3x"
                style={{ marginBottom: 30 }}
            />
            <AuthForm />
            <div className="authBtns">
                <button onClick={onSocialClick} name="google" className="authBtn">
                Continue with Google <FontAwesomeIcon icon={faGoogle} />
                </button>
                <button onClick={onSocialClick} name="github" className="authBtn">
                Continue with Github <FontAwesomeIcon icon={faGithub} />
                </button>
            </div>
        </div>
    )
};
export default Auth;
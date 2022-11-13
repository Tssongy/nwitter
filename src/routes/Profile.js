import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useHistory } from "react-router-dom";

const Profile = () => {
    const auth = getAuth();
    const history = useHistory();
    // const navigate = useNavigate();

    const onLogOutClick = () => {
        signOut(auth);
        history.push("/");
        // navigate("/", {replace: true})
    }
    return (
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
}

export default Profile;
import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { dbService } from "../fbase";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { useHistory } from "react-router-dom";

const Profile = ({ userObj }) => {
    const auth = getAuth();
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    // const navigate = useNavigate();

    const onLogOutClick = () => {
        signOut(auth);
        history.push("/");
        // navigate("/", {replace: true})
    }

    const getMyNweets = async () => {
        const q = query(
                collection(dbService, "nweets"),
                where("creatorId", "==", userObj.uid)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
        });
    }

    const onChange = (event) => {
        const {value} = event.target;
        setNewDisplayName(value);
    }

    const onSubmit = (event) => {
        event.preventDefault();
    }

    useEffect(() => {
        getMyNweets();
    }, [])

    return (
        <>
            <form onSubmit={onSubmit}>
                <input 
                    type="text" 
                    placeholder="Display name"
                    onChange={onChange}
                    value={newDisplayName} 
                />
                <input type="submit" value="Update Profile"/>
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
}

export default Profile;
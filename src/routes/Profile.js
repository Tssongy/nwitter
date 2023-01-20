import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { dbService } from "../fbase";
import { authService } from "../fbase";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { updateProfile } from "@firebase/auth";
import { useHistory } from "react-router-dom";

const Profile = ({ refreshUser, userObj }) => {
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

    const onSubmit = async (event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName){
            await updateProfile(authService.currentUser, { displayName: newDisplayName });
            refreshUser();
        }
    }


    useEffect(() => {
        getMyNweets();
    }, [])

    return (
        <div className="container">
          <form onSubmit={onSubmit} className="profileForm">
            <input
              onChange={onChange}
              type="text"
              autoFocus
              placeholder="Display name"
              value={newDisplayName}
              className="formInput"
            />
            <input
              type="submit"
              value="Update Profile"
              className="formBtn"
              style={{
                marginTop: 10,
              }}
            />
          </form>
          <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
            Log Out
          </span>
        </div>
      );
}

export default Profile;
import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";
import Nweet from "../components/Nweet";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import NweetFactory from "../components/NweetFactory";

const Home = ({ userObj }) => {
    const [nweets, setNweets] = useState([]);

    useEffect(() => {
        const q = query(
                collection(dbService, "nweets"),
                orderBy("createdAt", "desc")
        );
        onSnapshot(q, (snapshot) => {
            const nweetArr = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setNweets(nweetArr);
        });
    }, []);

    return (
        <div className="container">
            <NweetFactory userObj={userObj} />
            <div style={{ marginTop: 30 }}>
                {nweets.map((nweet) => 
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
                )}
            </div>
        </div>
    )
}
export default Home; 
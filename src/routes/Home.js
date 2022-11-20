import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";
import { collection, addDoc, getDocs, query } from "firebase/firestore";

const Home = () => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    
    const getNweets = async () => {
        const q = query(collection(dbService, "nweets"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const nweetObj = {
                ...doc.data(),
                id:doc.id
            }
            console.log(doc.data())
            setNweets(prev => [nweetObj, ...prev])
        })
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        await addDoc(collection(dbService, "nweets"), {
            nweet,
            createdAt: Date.now(),
        });
        setNweet("");
    };

    const onChange = (event) => {
        const { value } = event.target;
        console.log(value)
        setNweet(value);
    }

    useEffect(() => {
        getNweets();
    }, [])

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} value={nweet} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input type="submit" value="Nweet" />
            </form>
            <div>
                {nweets.map((nweet) => 
                    <div>
                        <h4>{nweet.nweet}</h4>
                    </div>
                )}
            </div>
        </div>
    )
}
export default Home; 
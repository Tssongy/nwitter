import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";
import Nweet from "../components/Nweet";
import { v4 as uuidv4} from "uuid";
import { collection, addDoc, getDocs, query, orderBy, onSnapshot } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { storageService } from "../fbase";

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState("");
    
    const getNweets = async () => {
        const q = query(collection(dbService, "nweets"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const nweetObj = {
                ...doc.data(),
                id:doc.id
            }
            console.log("doc data: ", doc.data())
            setNweets(prev => [nweetObj, ...prev])
        })
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = "";
        if(attachment !== ""){
            //create image folder
            const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
            //upload file
            const response = await uploadString(fileRef, attachment, "data_url");
            // get file url
            attachmentUrl = await getDownloadURL(response.ref);
        }
        
        await addDoc(collection(dbService, "nweets"), {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl
        });
        setNweet("");
        setAttachment("");
    };

    const onChange = (event) => {
        const { value } = event.target;
        console.log(value)
        setNweet(value);
    }

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
    }, [])
    const onFileChange = (event) => {
        const { files } = event.target;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const { currentTarget: { result } } = finishedEvent;
            setAttachment(result)
        }
        reader.readAsDataURL(theFile);
    };
    const onClearAttachment = () => setAttachment("");
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input 
                    onChange={onChange} 
                    value={nweet} 
                    type="text" 
                    placeholder="What's on your mind?" 
                    maxLength={120} 
                />
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type="submit" value="Nweet" />
                {attachment && 
                    <div>
                        <img src={attachment} width="50px" height="50px" />
                        <button onClick={onClearAttachment}>Clear</button>
                    </div>
                }
            </form>
            <div>
                {nweets.map((nweet) => 
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
                )}
            </div>
        </div>
    )
}
export default Home; 
import React, { useState } from "react";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { dbService } from "../fbase";
import { v4 as uuidv4} from "uuid";
import { storageService } from "../fbase";
import { collection, addDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const NweetFactory = ({ userObj }) => {
    const [attachment, setAttachment] = useState("");
    const [nweet, setNweet] = useState("");

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
    };

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
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
                <input 
                    className="factoryInput__input"
                    value={nweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                />
                <input type="submit" value="&rarr;" className="factoryInput__arrow" />
            </div>
            <label for="attach-file" className="factoryInput__label">
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input
                id="attach-file" 
                type="file" 
                accept="image/*" 
                onChange={onFileChange} 
                style={{
                    opacity: 0,
                }}
            />
            {attachment && (
                <div className="factoryForm__attachment">
                    <img
                        src={attachment}
                        style={{
                        backgroundImage: attachment,
                        }}
                    />
                    <div className="factoryForm__clear" onClick={onClearAttachment}>
                        <span>Remove</span>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
            )}
        </form>
    )
}

export default NweetFactory;
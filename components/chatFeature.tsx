"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import styles from "@/styles/chatFeature.module.css"
import { useState } from "react";
import Dropzone from 'react-dropzone';




const baseUrl = "http://localhost:3001";

const ChatFeature = () => {
  const [messages, setMessages] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  // this line is needed to get all the participants in the chats and videocall pariticpants. Grab everything from here and send it to the database. 
  const [participation, setParticipants] = useState < [] >([]) 

  const chatMessageHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("message", messages);
    if (file) {
      formData.append("file", file);
    }

    const sendContentToServer = await fetch(baseUrl + "/send-message", {
      method: "POST",
      body: formData,
    });

    if (sendContentToServer.ok) {
      // Handle success
      setMessages(""); 
      setFile(null); // Clear file after sending the message
    } else {
      // Handle error
      console.error("Failed to send message");
    }
  };

  return (
    <div className={styles.Box}>
      <form onSubmit={chatMessageHandler}>
        <div className={styles.innerBox}>
          {/* <div className={styles.chatFilterBox} id={styles.chatFilterBox}>
            {" "}
            <div className={styles.dropDown}>
              <span className = {styles.favoritesDropDown}> Favorites </span>
              <div className={styles.dropDownContent}>
                  
                  <p className={styles.dropDownElement}>Hello World!</p>
                  <p className={styles.dropDownElement}>Hello World!</p>
                  <p className={styles.dropDownElement}>Hello World!</p>
                  <p className={styles.dropDownElement}>Hello World!</p>
                 
                  
              </div>
              </div>
            
          </div> */}
          <ChatFilterFeature/>
          <div className={styles.chatBox} id={styles.chatBox}>
            <div className={styles.messageBox}> 
              <div className={styles.actualMessage}>
                message
              </div>
            </div>
            <div className={styles.inputBox}>
              <Dropzone 
                onDrop={(acceptedFiles: File[]) => {
                  // Only set the first accepted file
                  setFile(acceptedFiles[0]);
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps({ className: styles.dropzone })} style={{ cursor: 'pointer' }}>
                      <input {...getInputProps()} />
                      <span className={styles.uploadIcon}>
                        <FontAwesomeIcon icon={faPaperclip} />
                      </span>
                    </div>
                    
                    {file && (
                      <div className={styles.fileDetails}>
                        {file.name} ({(file.size / 1024).toFixed(2)} KB)
                      </div>
                    )}
                    
                  </section>
                )}
              </Dropzone>

              <textarea
                id={styles.userMessage}
                value={messages}
                placeholder="Type your message"
                onChange={(e) => setMessages(e.target.value)}
              />

              <div className={styles.sendButton}>
                <button className={styles.planeButton} type="submit">
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};


const ChatFilterFeature = () => {
  return(
    <div className={styles.chatFilterBox} id={styles.chatFilterBox}>
            {" "}
            <div className={styles.dropDown}>
              <span className = {styles.favoritesDropDown}> Favorites </span>
              <div className={styles.dropDownContent}>
                  
                  <p className={styles.dropDownElement}>Hello World!</p>
                  <p className={styles.dropDownElement}>Hello World!</p>
                  <p className={styles.dropDownElement}>Hello World!</p>
                  <p className={styles.dropDownElement}>Hello World!</p>
                 
                  
              </div>
              </div>
            
          </div>
  );
}






export default ChatFeature;


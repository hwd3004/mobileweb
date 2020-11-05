import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";
// import { connect } from "react-redux";
import FreeChatWrite from "./FreeChatWrite";
import "../css/FreeChat.css";

const FreeChat = () => {
  const [freeChats, setFreeChats] = useState([]);

  useEffect(() => {
    dbService
      .collection("FreeChatDB")
      .orderBy("createdAt", "asc")
      .onSnapshot((Snapshot) => {
        const chatArray = Snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // const chatArray = Snapshot.docs.map((doc) => {
        //   return { id: doc.id, ...doc.data() };
        // });
        setFreeChats(chatArray);
      });
  }, []);

  return (
    <div id="FreeChat">
      <div id="chatRoom">
        {freeChats.map((chat) => {
          const { createdAt, nickname, fileUrl, text, createdAtTime } = chat;

          return (
            <>
              <div key={createdAt} className="eachChat">
                <p className="nickname">{nickname}</p>

                <div className="chatBox">
                  {fileUrl ? (
                    <>
                      <img
                        className="freeChatimg"
                        src={fileUrl}
                        alt={`${nickname}의 이미지`}
                      />
                      <br></br>
                    </>
                  ) : null}
                  <p>{text}</p>
                </div>

                <p className="chatDate">{createdAtTime}</p>
              </div>
            </>
          );
        })}
      </div>
      <FreeChatWrite />
    </div>
  );
};

// const getStore = ({ reducerLog }) => {
//   return {
//     reducerLog,
//   };
// };

export default FreeChat;

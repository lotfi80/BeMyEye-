import React, { useState } from "react";
import "./writeMessage.css";
import Blind60 from "../Blind60";
import { useCategoryUserContext } from "../../context/CategoryUser";
import { sendMessage } from "../../http/api";

interface props {
  currentRecipient: string;
}

const WriteMessage: React.FC<props> = ({ currentRecipient }) => {
  const [recipients, setRecipients] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const { user } = useCategoryUserContext();

  const handleSend = async () => {
    if (!user) return;
    try {
      await sendMessage(user._id, recipients.split(","), message, subject);
    } catch (err) {
      console.log(err);
      console.log({ recipients, subject, message });
    }
  };
  console.log("WriteMessage rendered");
  return (
    <>
      {/* <Blind60 /> */}
      {/* <div className="screen"> */}
      <div className="letterContainer">
        <h1 className="title">Write a Message</h1>
        <form className="letterForm">
          <label className="label">Recipients</label>
          <input
            type="text"
            placeholder="Enter recipient usernames separated by commas"
            defaultValue={currentRecipient}
            value={recipients}
            onChange={(e) => setRecipients(e.target.value)}
            className="input"
          />
          <label className="label">Subject</label>
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="input"
          />
          <label className="label">Message</label>
          <textarea
            placeholder="Type your message here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="textarea"
          />
          <div className="buttonContainer">
            <button type="button" className="button">
              Attach Files
            </button>
            <button type="button" onClick={handleSend} className="button">
              Send
            </button>
          </div>
          <p className="note">* Separate usernames with commas</p>
        </form>
      </div>
      {/* </div> */}
    </>
  );
};

export default WriteMessage;

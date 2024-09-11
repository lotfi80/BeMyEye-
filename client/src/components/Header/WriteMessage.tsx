import React, { useState, useEffect } from "react";
import "./writeMessage.css";
import { useCategoryUserContext } from "../../context/CategoryUser";
import { attachmentUpload, getUsersByField, sendMessage } from "../../http/api";
import IUser from "../../interfaces/User";
import CloseButton from "../CloseButton";
import SuccessNote from "./SuccessNote";

interface props {
  currentRecipient: IUser | null;
  setLetterVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}
interface UploadResponse {
  fileUrl: string;
}

const WriteMessage: React.FC<props> = ({
  currentRecipient,
  setLetterVisible,
}) => {
  const [recipients, setRecipients] = useState(
    currentRecipient?.username ? currentRecipient.username : "incognito"
  );
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const { user } = useCategoryUserContext();
  const [attachments, setAttachments] = useState<string[]>([]);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (currentRecipient?.username) {
      setRecipients(currentRecipient.username);
    }
  }, [currentRecipient]);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log("File selected:", event.target.files?.[0]);
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    const newFormData = new FormData();
    newFormData.append("attachments", file);
    console.log("newFormData", newFormData);
    try {
      const response = await attachmentUpload(newFormData);
      if (!response) throw new Error("No response from server");
      console.log("File uploaded successfully:", response);
      setAttachments((prev) => [...prev, response.fileUrl]);
    } catch (err) {
      console.error("File upload failed:", err);
    }
  };

  const handleSend = async () => {
    if (!user) return;
    try {
      if (recipients) {
        const recipientUsernames = recipients
          .split(",")
          .map((username) => username.trim())
          .filter((username) => username.length > 0);

        const recipientPromises = recipientUsernames.map(async (username) => {
          try {
            const recipientData = await getUsersByField("username", username);
            if (recipientData) {
              return recipientData[0]._id;
            } else {
              console.error(`No ID found for username: ${username}`);
              return null;
            }
          } catch (error) {
            console.error(`Error fetching user ${username}:`, error);
            return null;
          }
        });

        const newArrayOfRecipients = (
          await Promise.all(recipientPromises)
        ).filter((id) => id !== null);
        await sendMessage(
          user._id,
          newArrayOfRecipients,
          message,
          subject,
          attachments
        );
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          if (setLetterVisible) setLetterVisible(false);
        }, 2000);
      }
    } catch (err) {
      console.log(err);
      console.log({ recipients, subject, message });
    }
  };

  const closeMessageWindow = () => {
    if (setLetterVisible) setLetterVisible(false);
  };

  return (
    <>
      <div className="letterContainer">
        <CloseButton setFunction={closeMessageWindow} />
        <h1 className="title">Write a Message</h1>
        <form className="letterForm">
          <label className="label">Recipients</label>
          <input
            type="text"
            placeholder="Enter recipient usernames separated by commas"
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
          {success && <SuccessNote />}
          <label className="label">Message</label>
          <textarea
            placeholder="Type your message here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="textarea"
          />
          <div className="buttonContainer">
            <label className="button">
              Attach Files
              <input
                type="file"
                onChange={handleFileUpload}
                className="hiddenInput"
              />
            </label>

            <button type="button" onClick={handleSend} className="button">
              Send
            </button>
          </div>
          <p className="note">* Separate usernames with commas</p>
        </form>
      </div>
    </>
  );
};

export default WriteMessage;

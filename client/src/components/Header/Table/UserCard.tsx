import React from "react";
import WriteMessage from "../WriteMessage";
import IUser from "../../../interfaces/User";
import { Button } from "./Button";

interface UserCardProps {
  user: IUser;
  isFollowed: boolean | undefined;
  setIsFollowed: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  handleButtonFollow: (accountOwner: IUser | null, user: IUser) => void;
  handleButtonUnFollow: (accountOwner: IUser | null, user: IUser) => void;
  accountOwner: IUser | null;
  letterVisible: boolean;
  setLetterVisible: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: IUser | null;
  setIsZoomed: React.Dispatch<React.SetStateAction<string | null>>;
  handleButtonViewPosts: (user: IUser) => void;
  handleButtonSendMessage: (user: IUser) => void;
}
const UserCard: React.FC<UserCardProps> = ({
  user,
  isFollowed,
  setIsFollowed,
  handleButtonFollow,
  handleButtonUnFollow,
  accountOwner,
  letterVisible,
  currentUser,
  setIsZoomed,
  handleButtonViewPosts,
  handleButtonSendMessage,
  setLetterVisible,
}) => {
  function userImage(user: any): string {
    const userImage = user?.profileimage?.includes("http")
      ? user?.profileimage
      : `http://localhost:5000/${user?.profileimage}`;
    return userImage;
  }
  function formatDate(dateString: any): string {
    if (!dateString) {
      return "";
    }
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }
  return (
    <td colSpan={8} className="userCardWrapper ">
      <div className={`userCard ${letterVisible ? "letterVisible" : ""}`}>
        <img src={`${userImage(user)}`} alt="avatar" />
        {isFollowed || (
          <div
            className="button follow"
            onClick={() => {
              handleButtonFollow(accountOwner, user);
              setIsFollowed(true);
            }}
          >
            <Button text="Follow"></Button>
          </div>
        )}
        {isFollowed && (
          <div
            className="button followed"
            onClick={() => {
              handleButtonUnFollow(accountOwner, user);
              setIsFollowed(false);
            }}
          >
            <Button text="Followed!"></Button>
          </div>
        )}

        {letterVisible || (
          <>
            <p className="name">{user.username}</p>
            <p className="address">
              {user.privacy.city ? user.city : ""},{" "}
              {user.privacy.country ? user.country : ""}
            </p>
            <div className="data">
              <p>
                {user.privacy.firstname ? user.firstname : ""}{" "}
                {user.privacy.lastname ? user.lastname : ""}
              </p>
              <br />
              <p>{user.privacy.birthdate ? formatDate(user.birthdate) : ""}</p>
              <br />
              <p>{user.privacy.email ? user.email : ""}</p>
              <br />
            </div>

            <div className="twoButtons">
              <div
                className="button view"
                onClick={() => handleButtonViewPosts(user)}
              >
                <Button text="View Posts"></Button>
              </div>
              <div
                className="button send"
                onClick={() => handleButtonSendMessage(user)}
              >
                <Button text="Send Message"></Button>
              </div>
            </div>
          </>
        )}
        {letterVisible && (
          <div
            className="letter"
            onClick={(e) => {
              setIsZoomed(null);
            }}
          >
            <WriteMessage
              currentRecipient={currentUser}
              setLetterVisible={setLetterVisible}
            />
          </div>
        )}
      </div>
    </td>
  );
};
export default UserCard;

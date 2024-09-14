import React, { useState, useEffect, useRef } from "react";
import { useCategoryUserContext } from "../../../context/CategoryUser";
import CloseButton from "../../CloseButton";
import Blind from "../../Blind";
import { getFollow_, deleteFollower } from "../../../http/api";
import { IUser } from "../../../interfaces/User";
import "./following.css";

const Following: React.FC = () => {
  const { user: accountOwner, setUser } = useCategoryUserContext();
  const [followingVisible, setFollowingVisible] = useState<boolean>(false);
  const [unfollowQueue, setUnfollowQueue] = useState<Set<string>>(new Set());
  const timerRefs = useRef<{ [key: string]: NodeJS.Timeout }>({});

  useEffect(() => {
    const getFollowing = async () => {
      try {
        if (accountOwner) {
          const data: IUser = await getFollow_(accountOwner._id);
          const following: IUser[] = data.following;
          setUser((prev: IUser | null) => ({ ...prev!, following: following }));
        }
      } catch (e) {
        console.error(e);
      }
    };
    getFollowing();
  }, []);

  function userImage(user: any): string {
    const userImage = user?.profileimage?.includes("http")
      ? user?.profileimage
      : `http://localhost:5000/${user?.profileimage}`;
    return userImage;
  }

  const handleButtonUnFollow = async (
    e,
    accountOwner: IUser | null,
    user: IUser
  ) => {
    setUnfollowQueue((prev) => new Set(prev).add(user._id));
    // debug*********************************************************
    if (e.target.checked) {
      if (timerRefs.current[user._id]) {
        clearTimeout(timerRefs.current[user._id]);
        delete timerRefs.current[user._id];
        console.log("Unfollow cancelled");
      }

      setUnfollowQueue((prev) => {
        const newSet = new Set(prev);
        newSet.delete(user._id);
        return newSet;
      });
      return;
    }

    timerRefs.current[user._id] = setTimeout(async () => {
      try {
        if (accountOwner) {
          await deleteFollower(accountOwner._id, user._id);
          setUser((prev: IUser | null) => {
            if (!prev) return prev;
            return {
              ...prev,
              following: prev.following.filter((f) => f._id !== user._id),
            };
          });
        }
      } catch (error) {
        console.error("Error: ", error);
      }

      setUnfollowQueue((prev) => {
        const newSet = new Set(prev);
        newSet.delete(user._id);
        return newSet;
      });
      delete timerRefs.current[user._id];
    }, 5000);
  };

  useEffect(() => {
    console.log("unfollow queue", unfollowQueue);
  }, [unfollowQueue]);

  return (
    <>
      <div
        className={` cursor-pointer`}
        onClick={(e) => {
          setFollowingVisible(true);
        }}
      >
        Following
      </div>

      {followingVisible && (
        <>
          <Blind />
          <div className="fixed mr-0 top-0 right-0 w-full h-full flex justify-center items-center z-50">
            <div className="window">
              <CloseButton
                setFunction={() => {
                  setFollowingVisible(false);
                }}
              />
              <h1 className="text-lg font-bold pl-0 ml-0">Following</h1>
              <hr />
              <div className="card">
                {accountOwner?.following.map((follow, index) => {
                  return (
                    <div key={index} className="follow">
                      <img src={userImage(follow)} alt="profileimage" />
                      <h3>{follow.username}</h3>
                      <p>{follow.firstname}</p>
                      <label className="container">
                        <input
                          type="checkbox"
                          checked={!unfollowQueue.has(follow._id)}
                          onChange={(e) => {
                            handleButtonUnFollow(e, accountOwner, follow);
                          }}
                        />
                        <div className="checkmark" />
                        <span className="tooltip">
                          {!unfollowQueue.has(follow._id)
                            ? "I don't want to follow anymore"
                            : "No, I want to follow again"}
                        </span>
                      </label>
                      <hr />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Following;

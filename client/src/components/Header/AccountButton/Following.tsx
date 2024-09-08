import React, { useState, useEffect } from "react";
import { useCategoryUserContext } from "../../../context/CategoryUser";
import CloseButton from "../../CloseButton";
import Blind from "../../Blind";
import { getFollow_ } from "../../../http/api";
import { IUser } from "../../../interfaces/User";
import { Button } from "../Table/Button";
import "./following.css";

const Following: React.FC = () => {
  const { user, setUser } = useCategoryUserContext();
  const [followingVisible, setFollowingVisible] = useState<boolean>(false);

  useEffect(() => {
    const getFollowing = async () => {
      try {
        if (user) {
          const data: IUser = await getFollow_(user._id);
          const following: IUser[] = data.following;
          setUser((prev: IUser | null) => ({ ...prev!, following: following }));
        }
      } catch (e) {
        console.error(e);
      }
    };
    console.log(user);
    getFollowing();
  }, []);

  function userImage(user: any): string {
    const userImage = user?.profileimage?.includes("http")
      ? user?.profileimage
      : `http://localhost:5000/${user?.profileimage}`;
    return userImage;
  }
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
                {user?.following.map((follow, index) => {
                  return (
                    <div key={index} className="follow">
                      <img src={userImage(follow)} alt="profileimage" />
                      <h3>{follow.username}</h3>
                      <p>{follow.firstname}</p>
                      <label className="container">
                        <input type="checkbox" defaultChecked={true} />
                        <div className="checkmark" />
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

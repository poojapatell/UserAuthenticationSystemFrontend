import React from "react";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import userimg from '../user.jpeg';
import '../Profile.css';
const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  if (!currentUser) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="container">
      <div class="main-box">
        <div>
            <h2>{currentUser.username}</h2>
            <div>
                <p>User Id  :- {currentUser.id}</p>
                <p>Email Id :- {currentUser.email}</p>
            </div>
            <div>
                <p>Token Id :- {currentUser.accessToken.substring(0, 20)} ...{" "}
                    {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}</p>
            </div>
        </div>
        <div>
            <img class="user-img" src={userimg} />
        </div>
    </div>
    </div>
  );
};
export default Profile;
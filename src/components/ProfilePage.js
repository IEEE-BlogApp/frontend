import React, { useContext } from "react";
import Navbar from "./Navbar";
import { Context } from "../index.js";
import "../styles/ProfilePage.css"; // Import CSS file for styling

function ProfilePage() {
  const { user } = useContext(Context);

  return (
    <>
    <Navbar />
    <div className="profile-container"> {/* Add a container with a class name */}
    
      <div className="profile-content"> {/* Add a content wrapper */}
        <h1>{user.name}</h1>
        <p>{user.email}</p>
      </div>
    </div>
    </>
  );
}

export default ProfilePage;

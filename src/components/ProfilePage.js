import React, { useContext } from "react";
import Navbar from "./Navbar";
import { Context } from "..";

function ProfilePage(){
const {user} =useContext(Context)
    return(
            <div>
            <Navbar />
                <h1>{user.name}</h1>
                <p>{user.email}</p>
            </div>
        )
}
export default ProfilePage;
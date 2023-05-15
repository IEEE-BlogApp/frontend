import React, { useContext } from "react";
import { Context } from "..";

function ProfilePage(){
const {user} =useContext(Context)
    return(
            <div>
                <h1>{user.name}</h1>
                <p>{user.email}</p>
            </div>
        )
}
export default ProfilePage;
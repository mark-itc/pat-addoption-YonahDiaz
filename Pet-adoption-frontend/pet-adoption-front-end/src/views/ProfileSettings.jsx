import "./ProfileSettings.css";
import { useState } from "react";

function ProfileDetails(props) {
  return (
    <div className="profile-details">
      <div className="prof-element">Edit Profile</div>
      <label className="prof-element">
        First Name:
        <input type="text" name="" />
      </label>
      <label className="prof-element">
        Last Name:
        <input type="text" name="" />
      </label>
      <label className="prof-element">
        Email:
        <input type="text" value="" />
      </label>
      <label className="prof-element">
        Pone Number:
        <input type="text" value="" />
      </label>
      <label className="prof-element">
        New Password:
        <input type="text" value="" />
      </label>
      <label className="prof-element">
        Confirm New Password:
        <input type="text" value="" />
      </label>
      <div>
        <button className="prof-element">Save</button>
      </div>
    </div>
  );
}

function ProfileSettings() {
  return (
    <div>
      <ProfileDetails />
    </div>
  );
}
export default ProfileSettings;

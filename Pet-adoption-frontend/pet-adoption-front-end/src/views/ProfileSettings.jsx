import "./ProfileSettings.css";
import { useState } from "react";

function ProfileDetails(props) {
  return (
    <div className="profile-details">
      <div className="prof-element">Edit Profile</div>
      <label className="prof-element">
        First Name:
        <input
          type="text"
          value={props.firstName}
          onChange={props.handleChangeFirstName}
        />
      </label>
      <label className="prof-element">
        Last Name:
        <input
          type="text"
          value={props.lastName}
          onChange={props.handleChangeLastName}
        />
      </label>
      <label className="prof-element">
        Email:
        <input
          type="text"
          value={props.email}
          onChange={props.handleChangeEmail}
        />
      </label>
      <label className="prof-element">
        Phone Number:
        <input
          type="text"
          value={props.phoneNumber}
          onChange={props.handleChangePhoneNumber}
        />
      </label>
      <label className="prof-element">
        New Password:
        <input
          type="text"
          value={props.password}
          onChange={props.handleChangePassword}
        />
      </label>
      <label className="prof-element">
        Confirm New Password:
        <input
          type="text"
          value={props.confirmPassword}
          onChange={props.handleChangeConfirmPassword}
        />
      </label>
      <div>
        <button className="prof-element" onClick={props.saveChangesButton}>
          Save
        </button>
      </div>
    </div>
  );
}

function ProfileSettings() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleChangeFirstName = (event) => {
    setFirstName(event.target.value);
  };
  const handleChangeLastName = (event) => {
    setLastName(event.target.value);
  };
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };
  const saveChangesButton = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhoneNumber("");
    setPassword("");
    setConfirmPassword("");

    console.log([
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      confirmPassword,
    ]);
  };

  return (
    <div>
      <ProfileDetails
        firstName={firstName}
        lastName={lastName}
        email={email}
        phoneNumber={phoneNumber}
        password={password}
        confirmPassword={confirmPassword}
        saveChangesButton={saveChangesButton}
        handleChangeFirstName={handleChangeFirstName}
        handleChangeLastName={handleChangeLastName}
        handleChangeEmail={handleChangeEmail}
        handleChangePhoneNumber={handleChangePhoneNumber}
        handleChangePassword={handleChangePassword}
        handleChangeConfirmPassword={handleChangeConfirmPassword}
      />
    </div>
  );
}
export default ProfileSettings;

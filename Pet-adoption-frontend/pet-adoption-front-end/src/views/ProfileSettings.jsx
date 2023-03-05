import "./ProfileSettings.css";
import { useState, useEffect } from "react";

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
          value={props.email}
          onChange={props.handleChangeEmail}
          type="email"
          id="email"
          pattern=".+@gmail\.com"
          size="30"
          required
        />
      </label>
      <label className="prof-element">
        Phone Number:
        <input
          value={props.phoneNumber}
          onChange={props.handleChangePhoneNumber}
          type="tel"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          required
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
      <div>
        <button
          className="prof-element"
          onClick={() => {
            props.saveChangesButton(props.userId);
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}

function ProfileSettings() {
  const [userId, setUserId] = useState("");
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      fetch("http://localhost:3001/user", {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setFirstName(data.user.firstName);
            setLastName(data.user.lastName);
            setEmail(data.user.email);
            setPhoneNumber(data.user.phoneNumber);
            setUserId(data.user._id);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      console.log("No token");
    }
  }, []);

  const saveChangesButton = async (id) => {
    const token = localStorage.getItem("token");
    await fetch("http://localhost:3001/user/" + id, {
      method: "PUT",
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPassword("");
      });
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
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

  return (
    <div className="background">
      <ProfileDetails
        userId={userId}
        firstName={firstName}
        lastName={lastName}
        email={email}
        phoneNumber={phoneNumber}
        password={password}
        saveChangesButton={saveChangesButton}
        handleChangeFirstName={handleChangeFirstName}
        handleChangeLastName={handleChangeLastName}
        handleChangeEmail={handleChangeEmail}
        handleChangePhoneNumber={handleChangePhoneNumber}
        handleChangePassword={handleChangePassword}
      />
    </div>
  );
}
export default ProfileSettings;

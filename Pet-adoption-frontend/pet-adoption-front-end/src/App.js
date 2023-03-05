import "./App.css";
import Search from "./views/Search";
import ProfileSettings from "./views/ProfileSettings";
import Pet from "./views/Pet";
import MyPets from "./views/MyPets";
import Home from "./views/Home";
import AdminDashboard from "./views/AdminDashboard";
import AdminAddPet from "./views/AdminAddPet";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function NavBar(props) {
  if (props.isAdmin === true) {
    return (
      <div className="nav-bar">
        <div className="links-container">
          <div>
            <Link to="/" className="links">
              Home
            </Link>
          </div>
          <div>
            <Link to="/Search" className="links">
              Search
            </Link>
          </div>
          <div>
            <Link to="/MyPets" className="links">
              My Pets
            </Link>
          </div>
          <div>
            <Link to="/ProfileSettings" className="links">
              Profile Settings
            </Link>
          </div>
          <div>
            <Link to="/AdminAddPet" className="links">
              Add Pet
            </Link>
          </div>
          <div>
            <Link to="/AdminDashboard" className="links">
              Dashboard
            </Link>
          </div>
          <div>
            <button className="log-out-button" onClick={props.logOut}>
              Log Out
            </button>
          </div>
          <div className="welcome-text">Welcome Back {props.welcomeName}</div>
        </div>
      </div>
    );
  }
  if (props.isAdmin === false && props.isLogged === true) {
    return (
      <div className="nav-bar">
        <div className="links-container">
          <div>
            <Link to="/" className="links">
              Home
            </Link>
          </div>
          <div>
            <Link to="/Search" className="links">
              Search
            </Link>
          </div>
          <div>
            <Link to="/MyPets" className="links">
              My Pets
            </Link>
          </div>
          <div>
            <Link to="/ProfileSettings" className="links">
              Profile Settings
            </Link>
          </div>
          <div>
            <button className="log-out-button" onClick={props.logOut}>
              Log Out
            </button>
          </div>
          <div className="welcome-text">Welcome Back {props.welcomeName}</div>
        </div>
      </div>
    );
  }
  if (props.isLogged === false) {
    return (
      <div className="nav-bar">
        <div className="links-container">
          <div>
            <Link to="/" className="links">
              Home
            </Link>
          </div>
          <div>
            <Link to="/Search" className="links">
              Search
            </Link>
          </div>
          <div>
            <button className="sign-in-button" onClick={props.openSignInModal}>
              Sign In?
            </button>
          </div>
          <div>
            <button className="log-in-button" onClick={props.openLogInModal}>
              Log In?
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function SignInAndLogInModal(props) {
  if (props.modalSignIn === true) {
    return (
      <div className="sign-in-container">
        <label>
          First Name:
          <input
            type="text"
            value={props.firstName}
            onChange={props.handleChangeFirstName}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            value={props.lastName}
            onChange={props.handleChangeLastName}
          />
        </label>
        <label>
          Email:
          <input
            placeholder="Only gmail address"
            value={props.email}
            onChange={props.handleChangeEmail}
            type="email"
            id="email"
            pattern=".+@gmail\.com"
            size="30"
            required
          />
        </label>
        <label>
          Phone Number:
          <input
            value={props.phoneNumber}
            onChange={props.handleChangePhoneNumber}
            type="tel"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            required
          />
        </label>
        <label>
          Password:
          <input
            type="text"
            value={props.password}
            onChange={props.handleChangePassword}
          />
        </label>
        <label>
          Confirm Password:
          <input
            type="text"
            value={props.confirmPassword}
            onChange={props.handleChangeConfirmPassword}
          />
        </label>
        <div>
          <button onClick={props.closeSignInModal}>Close</button>
          <button onClick={props.signInButton}>SignIn</button>
        </div>
      </div>
    );
  }
  if (props.modalLogIn === true) {
    return (
      <div className="log-in-container">
        <label>
          Email:
          <input
            type="text"
            value={props.email}
            onChange={props.handleChangeEmail}
          />
        </label>
        <label>
          Password:
          <input
            type="text"
            value={props.password}
            onChange={props.handleChangePassword}
          />
        </label>
        <div>
          <button onClick={props.closeLogInModal}>Close</button>
          <button onClick={props.logInButton}>LogIn</button>
        </div>
      </div>
    );
  }
}

function App() {
  const [welcomeName, setWelcomeName] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [modalSignIn, setModalSignIn] = useState(false);
  const [modalLogIn, setModalLogIn] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      fetch("http://localhost:3001/lastsession", {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setIsLogged(true);
            setWelcomeName(data.user.firstName);
            if (data.user.admin) {
              setIsAdmin(true);
            }
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      console.log("No token");
    }
  }, []);
  const openLogInModal = () => {
    setModalLogIn(true);
    setModalSignIn(false);
  };
  const closeLogInModal = () => {
    setModalLogIn(false);
  };
  const openSignInModal = () => {
    setModalSignIn(true);
    setModalLogIn(false);
  };
  const closeSignInModal = () => {
    setModalSignIn(false);
  };
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
  const signInButton = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhoneNumber("");
    setPassword("");
    setConfirmPassword("");
    if (password !== confirmPassword) {
      return;
    } else {
      fetch("http://localhost:3001/signIn", {
        method: "POST",
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phoneNumber,
          password,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.token) {
            localStorage.setItem("token", data.token);
          }
        })
        .then(() => {
          if (localStorage.getItem("token")) {
            const token = localStorage.getItem("token");
            fetch("http://localhost:3001/lastsession", {
              method: "GET",
              headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: `${token}`,
              },
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.user) {
                  setIsLogged(true);
                  setModalSignIn(false);
                  setWelcomeName(data.user.firstName);
                  navigate("/");
                  if (data.user.admin) {
                    setIsAdmin(true);
                  }
                }
              })
              .catch((err) => {
                console.log(err.message);
              });
          } else {
            console.log("No token");
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };
  const logInButton = () => {
    setEmail("");
    setPassword("");
    if (password && email) {
      fetch("http://localhost:3001/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.token) {
            localStorage.setItem("token", data.token);
          }
        })
        .then(() => {
          if (localStorage.getItem("token")) {
            const token = localStorage.getItem("token");
            fetch("http://localhost:3001/lastsession", {
              method: "GET",
              headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: `${token}`,
              },
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.user) {
                  setIsLogged(true);
                  setModalLogIn(false);
                  setWelcomeName(data.user.firstName);
                  navigate("/");
                  if (data.user.admin) {
                    setIsAdmin(true);
                  }
                }
              })
              .catch((err) => {
                console.log(err.message);
              });
          } else {
            console.log("No token");
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const logOut = () => {
    setIsLogged(false);
    setIsAdmin(false);
    setWelcomeName("");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <NavBar
        welcomeName={welcomeName}
        isAdmin={isAdmin}
        isLogged={isLogged}
        logOut={logOut}
        openLogInModal={openLogInModal}
        openSignInModal={openSignInModal}
      />
      <SignInAndLogInModal
        firstName={firstName}
        lastName={lastName}
        email={email}
        phoneNumber={phoneNumber}
        password={password}
        confirmPassword={confirmPassword}
        modalSignIn={modalSignIn}
        modalLogIn={modalLogIn}
        closeSignInModal={closeSignInModal}
        closeLogInModal={closeLogInModal}
        signInButton={signInButton}
        logInButton={logInButton}
        handleChangeFirstName={handleChangeFirstName}
        handleChangeLastName={handleChangeLastName}
        handleChangeEmail={handleChangeEmail}
        handleChangePhoneNumber={handleChangePhoneNumber}
        handleChangePassword={handleChangePassword}
        handleChangeConfirmPassword={handleChangeConfirmPassword}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Search" element={<Search />} />
        <Route
          path="/ProfileSettings"
          element={isLogged ? <ProfileSettings /> : <Navigate to="/" />}
        />
        <Route path="/Pet" element={<Pet />} />
        <Route
          path="/MyPets"
          element={isLogged ? <MyPets /> : <Navigate to="/" />}
        />
        <Route
          path="/AdminDashboard"
          element={isAdmin ? <AdminDashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/AdminAddPet"
          element={isAdmin ? <AdminAddPet /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;

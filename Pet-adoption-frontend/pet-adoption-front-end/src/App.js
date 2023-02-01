import "./App.css";
import Search from "./views/Search";
import ProfileSettings from "./views/ProfileSettings";
import Pet from "./views/Pet";
import MyPets from "./views/MyPets";
import Home from "./views/Home";
import AdminDashboard from "./views/AdminDashboard";
import AdminAddPet from "./views/AdminAddPet";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useState } from "react";

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
              MyPets
            </Link>
          </div>
          <div>
            <Link to="/ProfileSettings" className="links">
              ProfileSettings
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
            <button className="log-out-button">LogOut</button>
          </div>
          <div className="welcome-text">Welcome Back ?????</div>
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
              MyPets
            </Link>
          </div>
          <div>
            <Link to="/ProfileSettings" className="links">
              ProfileSettings
            </Link>
          </div>
          <div>
            <button className="log-out-button">LogOut</button>
          </div>
          <div className="welcome-text">Welcome Back ?????</div>
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
              SignIn?
            </button>
          </div>
          <div>
            <button className="log-in-button" onClick={props.openLogInModal}>
              LogIn?
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
          <input type="text" name="" />
        </label>
        <label>
          Last Name:
          <input type="text" name="" />
        </label>
        <label>
          Email:
          <input type="text" value="" />
        </label>
        <label>
          Pone Number:
          <input type="text" value="" />
        </label>
        <label>
          Password:
          <input type="text" value="" />
        </label>
        <label>
          Confirm Password:
          <input type="text" value="" />
        </label>
        <div>
          <button onClick={props.closeSignInModal}>Close</button>
          <button>SignIn</button>
        </div>
      </div>
    );
  }
  if (props.modalLogIn === true) {
    return (
      <div className="log-in-container">
        <label>
          Name:
          <input type="text" name="" />
        </label>
        <label>
          Email:
          <input type="text" value="" />
        </label>
        <div>
          <button onClick={props.closeLogInModal}>Close</button>
          <button>LogIn</button>
        </div>
      </div>
    );
  }
}

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [modalSignIn, setModalSignIn] = useState(false);
  const [modalLogIn, setModalLogIn] = useState(false);
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

  return (
    <div>
      <NavBar
        isAdmin={isAdmin}
        isLogged={isLogged}
        openLogInModal={openLogInModal}
        openSignInModal={openSignInModal}
      />
      <SignInAndLogInModal
        modalSignIn={modalSignIn}
        modalLogIn={modalLogIn}
        closeSignInModal={closeSignInModal}
        closeLogInModal={closeLogInModal}
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

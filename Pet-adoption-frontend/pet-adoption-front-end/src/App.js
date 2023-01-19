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
            <button>LogOut</button>
          </div>
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
          </div>{" "}
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
            <button>LogOut</button>
          </div>
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
          </div>{" "}
          <div>
            <button>LogIn</button>
          </div>
        </div>
      </div>
    );
  }
}

function App() {
  const [isLogged, setIsLogged] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true);

  return (
    <div>
      <NavBar isAdmin={isAdmin} isLogged={isLogged} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/Search"
          element={isLogged ? <Search /> : <Navigate to="/" />}
        />
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

import "./Search.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import background from "../images/Dog-and-cat-friends-pets_2560x1600.jpg";
function SearchForms(props) {
  if (props.advanceSearch === false) {
    return (
      <div className="search-container">
        <div>
          <input
            className="search-comp"
            placeholder="Search By Type"
            value={props.type}
            onChange={props.handleChangeType}
          ></input>
          <button className="search-comp" onClick={props.getPetByType}>
            Search
          </button>
          <button className="search-comp" onClick={props.advanceSearchToggle}>
            Advanced Search
          </button>
        </div>
      </div>
    );
  }
  if (props.advanceSearch === true) {
    return (
      <div className="search-container">
        <div className="search-form">
          <input
            className="search-comp"
            placeholder="Type"
            value={props.type}
            onChange={props.handleChangeType}
          ></input>
          <input
            className="search-comp"
            placeholder="Adoption Status"
            value={props.adoptionStatus}
            onChange={props.handleChangeAdoptionStatus}
          ></input>
          <input
            className="search-comp"
            placeholder="Height"
            value={props.height}
            onChange={props.handleChangeHeight}
          ></input>
          <input
            className="search-comp"
            placeholder="Weight"
            value={props.weight}
            onChange={props.handleChangeWeight}
          ></input>
          <input
            className="search-comp"
            placeholder="Pet Name"
            value={props.petName}
            onChange={props.handleChangePetName}
          ></input>
          <div className="adv-buttons">
            <button className="search-comp" onClick={props.getPetAdvanced}>
              Search
            </button>
            <button className="search-comp" onClick={props.advanceSearchToggle}>
              Normal Search
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function Results(props) {
  if (props.isLogged === true) {
    return (
      <div className="res-cont-search">
        {props.results.map((element, index) => (
          <div key={index}>
            <div className="row-cont-search">
              <img
                className="image-search"
                src={`http://localhost:3001/${element.photoPath}`}
                alt=""
              />
              <div className="col-cont-search">
                <div>Name: {element.petName}</div>
                <div>Status: {element.adoptionStatus}</div>
              </div>
              <button
                className="pet-page-button"
                onClick={() => {
                  props.goToButton(element._id);
                }}
              >
                Go To This Pet Page
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (props.isLogged === false) {
    return (
      <div className="res-cont-search">
        {props.results.map((element, index) => (
          <div key={index}>
            <div className="row-cont-search">
              <img
                className="image-search"
                src={`http://localhost:3001/${element.photoPath}`}
                alt=""
              />
              <div className="col-cont-search">
                <div>Name: {element.petName}</div>
                <div>Status: {element.adoptionStatus}</div>
              </div>
              <div className="log-in-info">Log In For More Info</div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

function Search() {
  const [advanceSearch, setAdvanceSearch] = useState(false);
  const [results, setResults] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [type, setType] = useState("");
  const [adoptionStatus, setAdoptionStatus] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [petName, setPetName] = useState("");
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
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
    }
  }, []);

  const goToButton = async (id) => {
    localStorage.setItem("petId", id);
    navigate("/Pet");
  };

  const getPetByType = async () => {
    await fetch("http://localhost:3001/petbytype", {
      method: "POST",
      body: JSON.stringify({ type }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setResults(data.pet);
        console.log(data);
        setType("");
      })
      .catch((err) => {
        console.log(err.message);
        setType("");
      });
  };

  const getPetAdvanced = async () => {
    await fetch("http://localhost:3001/petadvanced", {
      method: "POST",
      body: JSON.stringify({ type, adoptionStatus, height, weight, petName }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setResults(data.pet);
        console.log(data);
        setType("");
        setAdoptionStatus("");
        setHeight("");
        setWeight("");
        setPetName("");
      })
      .catch((err) => {
        console.log(err.message);
        setType("");
        setAdoptionStatus("");
        setHeight("");
        setWeight("");
        setPetName("");
      });
  };

  const handleChangeType = (event) => {
    setType(event.target.value);
  };
  const handleChangeAdoptionStatus = (event) => {
    setAdoptionStatus(event.target.value);
  };
  const handleChangeHeight = (event) => {
    setHeight(event.target.value);
  };
  const handleChangeWeight = (event) => {
    setWeight(event.target.value);
  };
  const handleChangePetName = (event) => {
    setPetName(event.target.value);
  };

  const advanceSearchToggle = () => {
    if (advanceSearch === false) {
      setAdvanceSearch(true);
    }
    if (advanceSearch === true) {
      setAdvanceSearch(false);
    }
  };
  return (
    <div className="search-and-res-container">
      <div>
        <SearchForms
          getPetByType={getPetByType}
          type={type}
          adoptionStatus={adoptionStatus}
          height={height}
          weight={weight}
          petName={petName}
          advanceSearch={advanceSearch}
          advanceSearchToggle={advanceSearchToggle}
          getPetAdvanced={getPetAdvanced}
          handleChangeType={handleChangeType}
          handleChangeAdoptionStatus={handleChangeAdoptionStatus}
          handleChangeHeight={handleChangeHeight}
          handleChangeWeight={handleChangeWeight}
          handleChangePetName={handleChangePetName}
        />
        <Results
          goToButton={goToButton}
          results={results}
          isLogged={isLogged}
        />
      </div>
    </div>
  );
}
export default Search;

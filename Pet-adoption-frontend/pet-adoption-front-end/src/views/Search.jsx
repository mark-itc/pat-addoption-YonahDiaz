import "./Search.css";
import { useState } from "react";
import Spider from "../images/spider.png";
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
          <button className="search-comp" onClick={props.simpleSearchButton}>
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
            <button
              className="search-comp"
              onClick={props.advancedSearchButton}
            >
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
  if (props.results === true && props.isLogged === true) {
    return (
      <div className="res-cont-search">
        <div className="row-cont-search">
          <img className="image-search" src={Spider} alt="" />
          <div className="col-cont-search">
            <div>Name: ?????</div>
            <div>Status: ??????</div>
          </div>
          <button className="pet-page-button">Go To This Pet Page</button>
        </div>
      </div>
    );
  }
  if (props.results === true && props.isLogged === false) {
    return (
      <div className="res-cont-search">
        <div className="row-cont-search">
          <img className="image-search" src={Spider} alt="" />
          <div className="col-cont-search">
            <div>Name: ?????</div>
            <div>Status: ??????</div>
          </div>
          <div className="log-in-info">Log In For More Info</div>
        </div>
      </div>
    );
  }
}

function Search() {
  const [advanceSearch, setAdvanceSearch] = useState(false);
  const [results, setResults] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const [type, setType] = useState("");
  const [adoptionStatus, setAdoptionStatus] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [petName, setPetName] = useState("");
  const simpleSearchButton = () => {
    console.log(type);
    setType("");
  };
  const advancedSearchButton = () => {
    console.log([type, adoptionStatus, height, weight, petName]);
    setType("");
    setAdoptionStatus("");
    setHeight("");
    setWeight("");
    setPetName("");
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
          type={type}
          adoptionStatus={adoptionStatus}
          height={height}
          weight={weight}
          petName={petName}
          advanceSearch={advanceSearch}
          advanceSearchToggle={advanceSearchToggle}
          simpleSearchButton={simpleSearchButton}
          advancedSearchButton={advancedSearchButton}
          handleChangeType={handleChangeType}
          handleChangeAdoptionStatus={handleChangeAdoptionStatus}
          handleChangeHeight={handleChangeHeight}
          handleChangeWeight={handleChangeWeight}
          handleChangePetName={handleChangePetName}
        />
        <Results results={results} isLogged={isLogged} />
      </div>
    </div>
  );
}
export default Search;

import "./Search.css";
import { useState } from "react";
import Spider from "../images/spider.png";
function SearchForms(props) {
  if (props.advanceSearch === false) {
    return (
      <div className="search-container">
        <div>
          <input className="search-comp" placeholder="Search By Type"></input>
          <button className="search-comp">Search</button>
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
          <input className="search-comp" placeholder="Type"></input>
          <input className="search-comp" placeholder="Adoption Status"></input>
          <input className="search-comp" placeholder="Height"></input>
          <input className="search-comp" placeholder="Weight"></input>
          <input className="search-comp" placeholder="Name"></input>
          <div className="adv-buttons">
            <button className="search-comp">Search</button>
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
          advanceSearch={advanceSearch}
          advanceSearchToggle={advanceSearchToggle}
        />
        <Results results={results} isLogged={isLogged} />
      </div>
    </div>
  );
}
export default Search;

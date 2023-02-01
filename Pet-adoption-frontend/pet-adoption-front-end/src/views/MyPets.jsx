import "./MyPets.css";
import Spider from "../images/spider.png";
import { useState } from "react";

function MyPetsList(props) {
  if (props.havePets === false) {
    return <div className="no-pets-message">You don't have any pet</div>;
  }

  if (props.havePets === true) {
    return (
      <div className="pets-cont">
        <div className="my-pets-header">My Pets</div>
        <div className="row-cont-pet">
          <img className="image" src={Spider} alt="" />
          <div className="col-cont-pet">
            <div>Name: ?????</div>
            <div>Status: ??????</div>
          </div>
          <button className="pet-page-button">See more</button>
        </div>
      </div>
    );
  }
}

function MyPets() {
  const [havePets, setHavePets] = useState(true);
  return (
    <div>
      <MyPetsList havePets={havePets} />
    </div>
  );
}
export default MyPets;

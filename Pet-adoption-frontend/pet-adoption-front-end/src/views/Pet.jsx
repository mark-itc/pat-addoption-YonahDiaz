import "./Pet.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function PetDetails(props) {
  if (
    props.adopted === false &&
    props.fostered === false &&
    props.saved === false
  ) {
    return (
      <div className="details-cont">
        <div className="row">
          <div className="column">
            <img
              className="img"
              src={`http://localhost:3001/${props.petDetails.photoPath}`}
              alt=""
            />
            <div className="details-elements">
              Name: {props.petDetails.petName}
            </div>
            <div className="details-elements">
              Type: {props.petDetails.type}
            </div>
            <div className="details-elements">
              Height: {props.petDetails.height}
            </div>
            <div className="details-elements">
              Weight: {props.petDetails.weight}
            </div>
            <div className="details-elements">
              Color: {props.petDetails.color}
            </div>
            <div className="details-elements">
              Breed: {props.petDetails.breed}
            </div>
            <div className="details-elements">
              Hipoalergenic: {props.petDetails.hipoalergenic}
            </div>
            <div className="details-elements">
              Dietary Restrictions: {props.petDetails.dietaryRestrictions}
            </div>
            <div className="details-elements">
              Status: {props.petDetails.adoptionStatus}
            </div>
            <div className="details-elements">
              Bio:
              {props.petDetails.bio}
            </div>
            <div>
              <button
                className="buttons"
                onClick={() => {
                  props.dpfButtons("Save");
                }}
              >
                Save
              </button>
              <button
                className="buttons"
                onClick={() => {
                  props.dpfButtons("Foster");
                }}
              >
                Foster
              </button>
              <button
                className="buttons"
                onClick={() => {
                  props.dpfButtons("Adopt");
                }}
              >
                Adopt
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (props.adopted === true || props.fostered === true) {
    return (
      <div className="details-cont">
        <div className="row">
          <div className="column">
            <img
              className="img"
              src={`http://localhost:3001/${props.petDetails.photoPath}`}
              alt=""
            />
            <div className="details-elements">
              Name: {props.petDetails.petName}
            </div>
            <div className="details-elements">
              Type: {props.petDetails.type}
            </div>
            <div className="details-elements">
              Height: {props.petDetails.height}
            </div>
            <div className="details-elements">
              Weight: {props.petDetails.weight}
            </div>
            <div className="details-elements">
              Color: {props.petDetails.color}
            </div>
            <div className="details-elements">
              Breed: {props.petDetails.breed}
            </div>
            <div className="details-elements">
              Hipoalergenic: {props.petDetails.hipoalergenic}
            </div>
            <div className="details-elements">
              Dietary Restrictions: {props.petDetails.dietaryRestrictions}
            </div>
            <div className="details-elements">
              Status: {props.petDetails.adoptionStatus}
            </div>
            <div className="details-elements">
              Bio:
              {props.petDetails.bio}
            </div>
            <div>
              <button
                className="buttons"
                onClick={() => {
                  props.dpfButtons("Return");
                }}
              >
                Return
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (
    props.adopted === false &&
    props.fostered === false &&
    props.saved === true
  ) {
    return (
      <div className="details-cont">
        <div className="row">
          <div className="column">
            <img
              className="img"
              src={`http://localhost:3001/${props.petDetails.photoPath}`}
              alt=""
            />
            <div className="details-elements">
              Name: {props.petDetails.petName}
            </div>
            <div className="details-elements">
              Type: {props.petDetails.type}
            </div>
            <div className="details-elements">
              Height: {props.petDetails.height}
            </div>
            <div className="details-elements">
              Weight: {props.petDetails.weight}
            </div>
            <div className="details-elements">
              Color: {props.petDetails.color}
            </div>
            <div className="details-elements">
              Breed: {props.petDetails.breed}
            </div>
            <div className="details-elements">
              Hipoalergenic: {props.petDetails.hipoalergenic}
            </div>
            <div className="details-elements">
              Dietary Restrictions: {props.petDetails.dietaryRestrictions}
            </div>
            <div className="details-elements">
              Status: {props.petDetails.adoptionStatus}
            </div>
            <div className="details-elements">
              Bio:
              {props.petDetails.bio}
            </div>
            <div>
              <button
                className="buttons"
                onClick={() => {
                  props.dpfButtons("Delete");
                }}
              >
                Delete
              </button>
              <button
                className="buttons"
                onClick={() => {
                  props.dpfButtons("Foster");
                }}
              >
                Foster
              </button>
              <button
                className="buttons"
                onClick={() => {
                  props.dpfButtons("Adopt");
                }}
              >
                Adopt
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function Pet() {
  const [adopted, setAdopted] = useState(false);
  const [fostered, setFostered] = useState(false);
  const [saved, setSaved] = useState(false);
  const [petDetails, setPetDetails] = useState();
  const navigate = useNavigate();
  async function getData() {
    if (localStorage.getItem("token") && localStorage.getItem("petId")) {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("petId");
      await fetch("http://localhost:3001/petanduser/" + id, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setPetDetails(data.pet);
          if (data.user.saved) {
            const savedPet = data.user.saved.find(
              (element) => element === data.pet._id
            );
            if (savedPet) {
              setSaved(true);
            }
          }
          if (data.user.adopted) {
            const adoptedPet = data.user.adopted.find(
              (element) => element === data.pet._id
            );
            if (adoptedPet) {
              setAdopted(true);
            }
          }
          if (data.user.fostered) {
            const fosteredPet = data.user.fostered.find(
              (element) => element === data.pet._id
            );
            if (fosteredPet) {
              setFostered(true);
            }
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
    }
  }

  async function dpfButtons(action) {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      const id = petDetails._id;
      console.log(action);
      console.log(id);
      await fetch("http://localhost:3001/safpet/" + id, {
        method: "POST",
        body: JSON.stringify({ action }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          navigate("/MyPets");
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
    }
  }

  useEffect(() => {
    getData();
    const timer = setTimeout(() => {
      localStorage.removeItem("petId");
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (petDetails) {
    return (
      <div className="background">
        <PetDetails
          dpfButtons={dpfButtons}
          petDetails={petDetails}
          adopted={adopted}
          fostered={fostered}
          saved={saved}
        />
      </div>
    );
  }
}
export default Pet;

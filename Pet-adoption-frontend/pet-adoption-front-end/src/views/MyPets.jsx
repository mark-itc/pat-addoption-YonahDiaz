import "./MyPets.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MyPetsList(props) {
  if (props.myPets) {
    return (
      <div className="my-pets-cont">
        {props.myPets.map((element, index) => (
          <div key={index}>
            <div className="row-cont-pet-my-pets">
              <img
                className="image-my-pets"
                src={`http://localhost:3001/${element.photoPath}`}
                alt=""
              />
              <div className="col-cont-pet">
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
}

function MyPets() {
  const [myPets, setMyPets] = useState([]);

  const navigate = useNavigate();
  const goToButton = async (id) => {
    localStorage.setItem("petId", id);
    navigate("/Pet");
  };
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
            console.log(data.user);
            const saved = data.user.saved;
            const adopted = data.user.adopted;
            const fostered = data.user.fostered;
            fetch("http://localhost:3001/mypets", {
              method: "POST",
              body: JSON.stringify({ saved, adopted, fostered }),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: `${token}`,
              },
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data);

                setMyPets(data.pet);

                console.log(myPets);
              })
              .catch((err) => {
                console.log(err.message);
              });
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      console.log("No token");
    }
  }, []);

  return (
    <div className="pets-cont">
      <MyPetsList myPets={myPets} goToButton={goToButton} />
    </div>
  );
}
export default MyPets;

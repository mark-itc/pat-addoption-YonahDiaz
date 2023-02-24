import "./AdminDashboard.css";
import { useState } from "react";

function PetsAndUsersModal(props) {
  if (props.modalUsers === true && props.modalEditPets === false) {
    return (
      <div>
        <div>
          <button onClick={props.closeUsersModal} className="prof-element">
            Close Users
          </button>
        </div>
        <div className="users-container">
          {props.users.map((element, index) => (
            <div key={index}>
              <div className="users-data">
                <div>Name: {element.firstName}</div>
                <div> Phone Number: {element.phoneNumber}</div>
                <div>Email: {element.email}</div>
                <div>Id: {element._id}</div>
                <div></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (props.modalPets === true && props.modalEditPets === false) {
    return (
      <div>
        <div>
          <button onClick={props.closePetsModal} className="prof-element">
            Close Pets
          </button>
          <div className="pets-container">
            {props.pets.map((element, index) => (
              <div className="res-cont-dash" key={index}>
                <div className="row-cont-dash">
                  <img
                    className="image"
                    src={`http://localhost:3001/${element.photoPath}`}
                    alt=""
                  />
                  <div className="col-cont-dash">
                    <div>Id: {element._id}</div>
                    <div>Name: {element.petName}</div>
                    <div>Type: {element.type}</div>
                    <div>Height: {element.height}</div>
                    <div>Weight: {element.weight}</div>
                    <div>Color: {element.color}</div>
                    <div>Breed: {element.breed}</div>
                    <div>Hipoalergenic: {element.hipoalergenic}</div>
                    <div>
                      Dietary Restrictions: {element.dietaryRestrictions}
                    </div>
                    <div>Adoption Status: {element.adoptionStatus}</div>
                    <div>Bio: {element.bio}</div>
                    <div>
                      <div>Registered at: {element.created_at}</div>
                    </div>
                    <button
                      onClick={() => {
                        props.openEditPetModal(element._id);
                      }}
                      className="pet-page-button"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

function UsersPetsButtons(props) {
  return (
    <div className="users-pets-buttons-container">
      <button className="users-pets-button" onClick={props.openUsersModal}>
        Users
      </button>
      <button className="users-pets-button" onClick={props.openPetsModal}>
        Pets
      </button>
    </div>
  );
}

function EditPet(props) {
  if (props.modalEditPets === true) {
    return (
      <div className="pet-details">
        <div className="prof-element">Edit Pet</div>
        <label className="prof-element">
          Name:
          <input
            type="text"
            value={props.petName}
            onChange={props.handleChangePetName}
          />
        </label>
        <label className="prof-element">
          Type:
          <input
            type="text"
            value={props.type}
            onChange={props.handleChangeType}
          />
        </label>
        <label className="prof-element">
          Height:
          <input
            type="text"
            value={props.height}
            onChange={props.handleChangeHeight}
          />
        </label>
        <label className="prof-element">
          Weight:
          <input
            type="text"
            value={props.weight}
            onChange={props.handleChangeWeight}
          />
        </label>
        <label className="prof-element">
          Color:
          <input
            type="text"
            value={props.color}
            onChange={props.handleChangeColor}
          />
        </label>
        <label className="prof-element">
          Breed:
          <input
            type="text"
            value={props.breed}
            onChange={props.handleChangeBreed}
          />
        </label>
        <label className="prof-element">
          Hipoalergenic:
          <input
            type="text"
            value={props.hipoalergenic}
            onChange={props.handleChangeHipoalergenic}
          />
        </label>
        <label className="prof-element">
          Dietary Restrictions:
          <input
            type="text"
            value={props.dietaryRestrictions}
            onChange={props.handleChangeDietaryRestrictions}
          />
        </label>
        <label className="prof-element">
          Photo
          <div className="prof-element">
            <input
              src={`http://localhost:3001/${props.pet.pet.photoPath}`}
              type="file"
              name="file"
              onChange={props.handleFileChange}
            ></input>
          </div>
        </label>
        <label className="prof-element">
          Adoption Status:
          <input
            type="text"
            value={props.adoptionStatus}
            onChange={props.handleChangeAdoptionStatus}
          />
        </label>
        <textarea
          className="bio-area"
          type="text"
          value={props.bio}
          placeholder="Bio"
          onChange={props.handleChangeBio}
        />

        <div>
          <button
            className="prof-element"
            onClick={() => {
              props.handleSaveChanges(props.pet.pet._id);
            }}
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={props.closeEditPetModal}
            className="prof-element"
          >
            Close
          </button>
        </div>
      </div>
    );
  }
}

function AdminDashboard() {
  const [image, setImage] = useState({ data: "" });
  const [pet, setPet] = useState({});
  const [users, setUsers] = useState([]);
  const [pets, setPets] = useState([]);
  const [petName, setPetName] = useState("");
  const [type, setType] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [color, setColor] = useState("");
  const [breed, setBreed] = useState("");
  const [hipoalergenic, setHipoalergenic] = useState("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [adoptionStatus, setAdoptionStatus] = useState("");
  const [bio, setBio] = useState("");

  const handleSaveChanges = async (id) => {
    if (
      petName &&
      type &&
      height &&
      weight &&
      color &&
      breed &&
      hipoalergenic &&
      dietaryRestrictions &&
      adoptionStatus &&
      bio
    ) {
      const token = localStorage.getItem("token");
      let formData = new FormData();
      formData.append("file", image.data);
      formData.append("petName", petName);
      formData.append("type", type);
      formData.append("height", height);
      formData.append("weight", weight);
      formData.append("color", color);
      formData.append("breed", breed);
      formData.append("hipoalergenic", hipoalergenic);
      formData.append("dietaryRestrictions", dietaryRestrictions);
      formData.append("adoptionStatus", adoptionStatus);
      formData.append("bio", bio);
      await fetch("http://localhost:3001/pet/" + id, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (localStorage.getItem("token") && data) {
            const token = localStorage.getItem("token");
            fetch("http://localhost:3001/pets", {
              method: "GET",
              headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: `${token}`,
              },
            })
              .then((response) => response.json())
              .then((data) => {
                setPets(data);
              })
              .catch((err) => {
                console.log(err.message);
              });
          } else {
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
      if (localStorage.getItem("token")) {
        const token = localStorage.getItem("token");
        fetch("http://localhost:3001/pets", {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setPets(data);
            setModalEditPets(false);
          })
          .catch((err) => {
            console.log(err.message);
          });
      } else {
      }
      setPetName("");
      setType("");
      setHeight("");
      setWeight("");
      setColor("");
      setBreed("");
      setHipoalergenic("");
      setDietaryRestrictions("");
      setAdoptionStatus("");
      setBio("");
    } else {
      setPetName("");
      setType("");
      setHeight("");
      setWeight("");
      setColor("");
      setBreed("");
      setHipoalergenic("");
      setDietaryRestrictions("");
      setAdoptionStatus("");
      setBio("");
      return;
    }
  };

  const handleFileChange = (e) => {
    const img = {
      data: e.target.files[0],
    };
    setImage(img);
  };

  const handleChangePetName = (event) => {
    setPetName(event.target.value);
  };
  const handleChangeType = (event) => {
    setType(event.target.value);
  };
  const handleChangeHeight = (event) => {
    setHeight(event.target.value);
  };
  const handleChangeWeight = (event) => {
    setWeight(event.target.value);
  };
  const handleChangeColor = (event) => {
    setColor(event.target.value);
  };
  const handleChangeBreed = (event) => {
    setBreed(event.target.value);
  };
  const handleChangeHipoalergenic = (event) => {
    setHipoalergenic(event.target.value);
  };
  const handleChangeDietaryRestrictions = (event) => {
    setDietaryRestrictions(event.target.value);
  };
  const handleChangeAdoptionStatus = (event) => {
    setAdoptionStatus(event.target.value);
  };

  const handleChangeBio = (event) => {
    setBio(event.target.value);
  };

  const [modalUsers, setModalUsers] = useState(false);
  const [modalPets, setModalPets] = useState(false);
  const [modalEditPets, setModalEditPets] = useState(false);

  const getAllPets = () => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      fetch("http://localhost:3001/pets", {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setPets(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      console.log("No auth");
    }
  };

  const openPetsModal = () => {
    getAllPets();
    setModalPets(true);
    setModalUsers(false);
  };
  const closePetsModal = () => {
    setModalPets(false);
  };

  const getAllUsers = () => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      fetch("http://localhost:3001/users", {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUsers(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      console.log("No auth");
    }
  };

  const openUsersModal = () => {
    getAllUsers();
    setModalUsers(true);
    setModalPets(false);
  };
  const closeUsersModal = () => {
    setModalUsers(false);
  };
  const openEditPetModal = (id) => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      fetch("http://localhost:3001/pet/" + id, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setPet(data);
          console.log(data);
          setModalEditPets(true);
          setPetName(data.pet.petName);
          setType(data.pet.type);
          setHeight(data.pet.height);
          setWeight(data.pet.weight);
          setColor(data.pet.color);
          setBreed(data.pet.breed);
          setHipoalergenic(data.pet.hipoalergenic);
          setDietaryRestrictions(data.pet.dietaryRestrictions);
          setAdoptionStatus(data.pet.adoptionStatus);
          setBio(data.pet.bio);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      console.log("No auth");
    }
  };
  const closeEditPetModal = () => {
    setModalEditPets(false);
  };

  return (
    <div>
      <div>
        <UsersPetsButtons
          openUsersModal={openUsersModal}
          openPetsModal={openPetsModal}
        />
        <PetsAndUsersModal
          users={users}
          pets={pets}
          modalUsers={modalUsers}
          modalPets={modalPets}
          closeUsersModal={closeUsersModal}
          closePetsModal={closePetsModal}
          modalEditPets={modalEditPets}
          openEditPetModal={openEditPetModal}
        />
      </div>
      <div>
        <EditPet
          handleSaveChanges={handleSaveChanges}
          handleFileChange={handleFileChange}
          pet={pet}
          closeEditPetModal={closeEditPetModal}
          image={image}
          modalEditPets={modalEditPets}
          petName={petName}
          type={type}
          height={height}
          weight={weight}
          color={color}
          breed={breed}
          hipoalergenic={hipoalergenic}
          dietaryRestrictions={dietaryRestrictions}
          adoptionStatus={adoptionStatus}
          bio={bio}
          handleChangePetName={handleChangePetName}
          handleChangeType={handleChangeType}
          handleChangeHeight={handleChangeHeight}
          handleChangeWeight={handleChangeWeight}
          handleChangeColor={handleChangeColor}
          handleChangeBreed={handleChangeBreed}
          handleChangeHipoalergenic={handleChangeHipoalergenic}
          handleChangeDietaryRestrictions={handleChangeDietaryRestrictions}
          handleChangeAdoptionStatus={handleChangeAdoptionStatus}
          handleChangeBio={handleChangeBio}
        />
      </div>
    </div>
  );
}
export default AdminDashboard;

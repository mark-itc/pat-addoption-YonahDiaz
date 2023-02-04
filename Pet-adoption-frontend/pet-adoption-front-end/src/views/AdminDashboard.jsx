import "./AdminDashboard.css";
import { useState } from "react";
import Spider from "../images/spider.png";

function PetsAndUsersModal(props) {
  if (props.modalUsers === true && props.modalEditPets === false) {
    return (
      <div>
        <button onClick={props.closeUsersModal} className="prof-element">
          Close Users
        </button>
        <div className="users-data">
          <div>Name</div>
          <div>Phone Number</div>
          <div>Email</div>
          <div>Id</div>
          <div>
            <button className="prof-element">Delete User</button>
          </div>
        </div>
      </div>
    );
  }
  if (props.modalPets === true && props.modalEditPets === false) {
    return (
      <div>
        <button onClick={props.closePetsModal} className="prof-element">
          Close Pets
        </button>
        <div className="res-cont-dash">
          <div className="row-cont-dash">
            <img className="image" src={Spider} alt="" />
            <div className="col-cont-dash">
              <div>Name: ?????</div>
              <div>Status: ??????</div>
            </div>
            <button
              onClick={props.openEditPetModal}
              className="pet-page-button"
            >
              Edit
            </button>
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
          Status:
          <input
            type="text"
            value={props.adoptionStatus}
            onChange={props.handleChangeAdoptionStatus}
          />
          <div className="prof-element">Add Profile Picture +</div>
        </label>

        <textarea
          className="bio-area"
          type="text"
          value={props.bio}
          onChange={props.handleChangeBio}
          placeholder="Bio"
        />

        <div>
          <button className="prof-element" onClick={props.savePetChangesButton}>
            Save Changes
          </button>
          <button className="prof-element">Delete Pet</button>
          <button onClick={props.closeEditPetModal} className="prof-element">
            Close
          </button>
        </div>
      </div>
    );
  }
}

function AdminDashboard() {
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
  const savePetChangesButton = () => {
    console.log([
      petName,
      type,
      height,
      weight,
      color,
      breed,
      hipoalergenic,
      dietaryRestrictions,
      adoptionStatus,
      bio,
    ]);
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
  };
  const [modalUsers, setModalUsers] = useState(false);
  const [modalPets, setModalPets] = useState(false);
  const [modalEditPets, setModalEditPets] = useState(false);

  const openPetsModal = () => {
    setModalPets(true);
    setModalUsers(false);
  };
  const closePetsModal = () => {
    setModalPets(false);
  };
  const openUsersModal = () => {
    setModalUsers(true);
    setModalPets(false);
  };
  const closeUsersModal = () => {
    setModalUsers(false);
  };
  const openEditPetModal = () => {
    setModalEditPets(true);
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
          closeEditPetModal={closeEditPetModal}
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
          savePetChangesButton={savePetChangesButton}
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

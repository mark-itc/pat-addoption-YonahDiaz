import "./AdminAddPet.css";
import { useState } from "react";
function AddPet(props) {
  return (
    <div className="pet-details">
      <div className="prof-element">Add Pet</div>
      <label className="prof-element">
        Pet Name:
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
        <button className="prof-element" onClick={props.addPetButton}>
          Save
        </button>
      </div>
    </div>
  );
}

function AdminAddPet() {
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
  const addPetButton = () => {
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

  return (
    <div>
      <AddPet
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
        addPetButton={addPetButton}
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
  );
}
export default AdminAddPet;

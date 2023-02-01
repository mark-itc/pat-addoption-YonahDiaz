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
          <input type="text" name="" />
        </label>
        <label className="prof-element">
          Type:
          <input type="text" name="" />
        </label>
        <label className="prof-element">
          Height:
          <input type="text" value="" />
        </label>
        <label className="prof-element">
          Weight:
          <input type="text" value="" />
        </label>
        <label className="prof-element">
          Color:
          <input type="text" value="" />
        </label>
        <label className="prof-element">
          Breed:
          <input type="text" value="" />
        </label>
        <label className="prof-element">
          Hipoalergenic:
          <input type="text" value="" />
        </label>
        <label className="prof-element">
          Dietary Restrictions:
          <input type="text" value="" />
        </label>
        <label className="prof-element">
          Status:
          <input type="text" value="" />
          <div className="prof-element">Add Profile Picture +</div>
        </label>

        <textarea className="bio-area" type="text" placeholder="Bio" />

        <div>
          <button className="prof-element">Save</button>
          <button onClick={props.closeEditPetModal} className="prof-element">
            Close
          </button>
        </div>
      </div>
    );
  }
}

function AdminDashboard() {
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
        />
      </div>
    </div>
  );
}
export default AdminDashboard;

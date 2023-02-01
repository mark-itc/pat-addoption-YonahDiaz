import "./AdminAddPet.css";
function AddPet(props) {
  return (
    <div className="pet-details">
      <div className="prof-element">Add Pet</div>
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
      </div>
    </div>
  );
}

function AdminAddPet() {
  return (
    <div>
      <AddPet />
    </div>
  );
}
export default AdminAddPet;

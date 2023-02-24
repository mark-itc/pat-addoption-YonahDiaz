let petsCollection;

module.exports = class PetsDAO {
  static async injectDB(connection) {
    if (!connection) return;

    try {
      petsCollection = await connection.collection("pets");
    } catch (e) {
      console.log(`Could not establish connection to pets collection ${e}`);
    }
  }
  static async createPet(petData, photoPath) {
    petData.photoPath = photoPath;
    petData.available = true;
    petData.created_at = new Date();
    await petsCollection.insertOne({ ...petData });
  }

  static async getAllPets() {
    return await petsCollection.find({}).toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  }

  static async getPetById(_id) {
    return await petsCollection.findOne({ _id });
  }

  static async editPet(_id, newData, photoPath) {
    petsCollection.updateOne(
      { _id },
      {
        $set: {
          petName: newData.petName,
          type: newData.type,
          height: newData.height,
          weight: newData.weight,
          color: newData.color,
          breed: newData.breed,
          hipoalergenic: newData.hipoalergenic,
          dietaryRestrictions: newData.dietaryRestrictions,
          bio: newData.bio,
          adoptionStatus: newData.adoptionStatus,
          photoPath: photoPath,
          petName: newData.petName,
        },
      }
    );
  }
};

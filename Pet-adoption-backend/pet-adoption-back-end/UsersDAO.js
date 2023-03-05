let usersCollection;

module.exports = class UsersDAO {
  static async injectDB(connection) {
    if (!connection) return;

    try {
      usersCollection = await connection.collection("users");
    } catch (e) {
      console.log(`Could not establish connection to users collection ${e}`);
    }
  }
  static async getUserByEmail(email) {
    return await usersCollection.findOne({ email });
  }
  static async getUserById(_id) {
    return await usersCollection.findOne({ _id });
  }

  static async getAllUsers() {
    return await usersCollection.find({}).toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  }

  static async createUser(userData) {
    userData.created_at = new Date();
    userData.admin = false;
    userData.saved = [];
    userData.fostered = [];
    userData.adopted = [];
    await usersCollection.insertOne({ ...userData });
  }

  static async editUser(_id, newData) {
    usersCollection.updateOne(
      { _id },
      {
        $set: {
          firstName: newData.firstName,
          lastName: newData.lastName,
          email: newData.email,
          phoneNumber: newData.phoneNumber,
          password: newData.password,
        },
      }
    );
  }

  static async savePet(_id, id) {
    await usersCollection.updateOne(
      { _id },
      {
        $addToSet: {
          saved: id,
        },
      }
    );
  }

  static async adoptPet(_id, id) {
    await usersCollection.updateOne(
      { _id },
      {
        $addToSet: {
          adopted: id,
        },
      }
    );
  }
  static async fosterPet(_id, id) {
    await usersCollection.updateOne(
      { _id },
      {
        $addToSet: {
          fostered: id,
        },
      }
    );
  }

  static async deleteSaved(_id, id) {
    await usersCollection.updateOne(
      { _id },
      {
        $pull: {
          saved: id,
        },
      }
    );
  }

  static async returnPet(_id, id) {
    await usersCollection.updateOne(
      { _id },
      {
        $pull: {
          fostered: id,
          adopted: id,
        },
      }
    );
  }
};

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
  static async createUser(userData) {
    userData.created_at = new Date();
    userData.admin = false;
    await usersCollection.insertOne({ ...userData });
  }
};

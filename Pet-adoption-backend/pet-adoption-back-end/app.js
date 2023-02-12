const { MongoClient } = require("mongodb");
const UsersDAO = require("./UsersDAO");
const PetsDAO = require("./PetsDAO");
const {
  RegisterValidation,
  LoginValidation,
} = require("./validations/UsersValidations");
const jwt = require("jsonwebtoken");
const sha256 = require("js-sha256");
const { ObjectId } = require("mongodb");
require("dotenv").config();
var cors = require("cors");
const express = require("express");
const app = express();

app.use(cors());
app.use(express.json());

async function initDB() {
  MongoClient.connect(process.env.MONGODB_URI)
    .then(async (connection) => {
      const db = connection.db(process.env.DB);
      await UsersDAO.injectDB(db);
      await PetsDAO.injectDB(db);
      console.log("Connection to DB established");
      return;
    })
    .catch((error) => {
      console.log(error);
      console.log(`DB connection failed ${error}`);
      process.exit(1);
    });
}

initDB();

async function registerValidation(req, res, next) {
  const validRequest = RegisterValidation(req.body);

  if (!validRequest) {
    return res.status(400).json({
      success: false,
      message: "Please fill all fields",
    });
  }
  next();
}

async function loginValidation(req, res, next) {
  const validRequest = LoginValidation(req.body);

  if (!validRequest) {
    return res.status(400).json({
      success: false,
      message: "Please fill all fields",
    });
  }
  next();
}

async function register(req, res) {
  try {
    const userObject = req.body;
    const existingEmail = await UsersDAO.getUserByEmail(userObject.email);
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Please select a different email",
      });
    }
    userObject.password = sha256(userObject.password);
    await UsersDAO.createUser(userObject);
    const newUser = await UsersDAO.getUserByEmail(userObject.email);
    const token = jwt.sign(
      {
        user_id: newUser._id,
      },
      process.env.JWT_SECRET
    );
    return res.json({
      token,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "unknown error",
    });
  }
}

async function login(req, res) {
  try {
    const user = await UsersDAO.getUserByEmail(req.body.email);
    if (!user || user.password != sha256(req.body.password)) {
      return res.status(400).json({
        success: false,
        message: "Wrong email or password",
      });
    }
    const token = jwt.sign(
      {
        user_id: user._id,
      },
      process.env.JWT_SECRET
    );
    if (user && user.password === sha256(req.body.password)) {
      return res.json({
        token: token,
      });
    }
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "unknown error",
    });
  }
}

async function lastSession(req, res) {
  try {
    token = await req.headers.authorization;
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (verified) {
      const user = await UsersDAO.getUserById(new ObjectId(verified.user_id));
      return res.json({
        user,
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "unknown error",
    });
  }
}

app.post("/signIn", registerValidation, register);

app.post("/login", loginValidation, login);

app.get("/lastsession", lastSession);

app.listen(3001, async () => {
  console.log("Server is running on port 3001");
});

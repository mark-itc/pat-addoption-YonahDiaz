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
const multer = require("multer");

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

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname.replace(/\s+/g, ""));
  },
});
const upload = multer({ storage: storage, preservePath: true });

app.use(express.static("images"));
app.use("/images", express.static("images"));

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

async function isLogged(req, res, next) {
  try {
    token = await req.headers.authorization;
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (verified) {
      next();
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "unknown error",
    });
  }
}
async function isAdmin(req, res, next) {
  try {
    token = await req.headers.authorization;
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UsersDAO.getUserById(new ObjectId(verified.user_id));
    if (user.admin === true) {
      next();
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "unknown error",
    });
  }
}
async function addPet(req, res) {
  try {
    const petObject = req.body;
    await PetsDAO.createPet(petObject, req.file.path);
    return res.json({});
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "unknown error",
    });
  }
}

async function getAllUsers(req, res) {
  try {
    users = await UsersDAO.getAllUsers();
    return res.json(users);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "unknown error",
    });
  }
}

async function getAllPets(req, res) {
  try {
    pets = await PetsDAO.getAllPets();
    return res.json(pets);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "unknown error",
    });
  }
}

async function getPet(req, res) {
  try {
    const id = await req.params["id"];
    console.log(id);
    const pet = await PetsDAO.getPetById(new ObjectId(id));
    console.log(pet);
    return res.json({
      pet,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "unknown error",
    });
  }
}

async function editPet(req, res) {
  try {
    const id = await req.params["id"];
    const pet = await PetsDAO.getPetById(new ObjectId(id));
    const petObject = req.body;
    if (!req.file) {
      await PetsDAO.editPet(new ObjectId(id), petObject, pet.photoPath);
    } else {
      await PetsDAO.editPet(new ObjectId(id), petObject, req.file.path);
    }

    return res.status(200).json({
      id,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "unknown error",
    });
  }
}

async function getUser(req, res) {
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

async function editUser(req, res) {
  try {
    const id = await req.params["id"];
    const userObject = await req.body;
    const user = await UsersDAO.getUserById(new ObjectId(id));
    const existingEmail = await UsersDAO.getUserByEmail(userObject.email);
    if (existingEmail) {
      if (existingEmail.email !== user.email) {
        return res.status(400).json({
          success: false,
          message: "Please select a different email",
        });
      }
    }
    if (userObject.password === "") {
      userObject.password = user.password;
      console.log(userObject);
      const validRequest = RegisterValidation(userObject);
      if (!validRequest) {
        return res.status(400).json({
          success: false,
          message: "Please fill all fields",
        });
      }
      await UsersDAO.editUser(new ObjectId(id), userObject);
      console.log(await user);
      return res.status(200).json({
        id,
      });
    } else {
      const validRequest = RegisterValidation(userObject);
      if (!validRequest) {
        return res.status(400).json({
          success: false,
          message: "Please fill all fields",
        });
      }
      userObject.password = sha256(userObject.password);
      console.log(userObject);
      await UsersDAO.editUser(new ObjectId(id), userObject);
      console.log(await user);
      return res.status(200).json({
        id,
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

async function getPetByType(req, res) {
  try {
    const type = await req.body.type;
    console.log(req.body);
    const pet = await PetsDAO.getPetByType(type);
    console.log(pet);
    return res.json({
      pet,
    });
  } catch (e) {
    console.log(e);
    return res.status(404).json({
      success: false,
      message: "Not Found",
    });
  }
}

async function getPetAdvanced(req, res) {
  try {
    let petObject = {};
    if (req.body.type !== "") {
      petObject.type = await req.body.type;
    }
    if (req.body.adoptionStatus !== "") {
      petObject.adoptionStatus = await req.body.adoptionStatus;
    }
    if (req.body.height !== "") {
      petObject.height = await req.body.height;
    }
    if (req.body.weight !== "") {
      petObject.weight = await req.body.weight;
    }
    if (req.body.petName !== "") {
      petObject.petName = await req.body.petName;
    }

    console.log(petObject);
    const pet = await PetsDAO.getPetAdvanced(petObject);
    console.log(pet);
    return res.json({
      pet,
    });
  } catch (e) {
    console.log(e);
    return res.status(404).json({
      success: false,
      message: "Not Found",
    });
  }
}

async function getMyPets(req, res) {
  try {
    let pet = [];
    if (req.body.saved) {
      for (let i = 0; i < req.body.saved.length; i++) {
        pet.push(await PetsDAO.getPetById(new ObjectId(req.body.saved[i])));
      }
    }

    if (req.body.adopted) {
      for (let i = 0; i < req.body.adopted.length; i++) {
        pet.push(await PetsDAO.getPetById(new ObjectId(req.body.adopted[i])));
      }
    }

    if (req.body.fostered) {
      for (let i = 0; i < req.body.fostered.length; i++) {
        pet.push(await PetsDAO.getPetById(new ObjectId(req.body.fostered[i])));
      }
    }

    console.log(pet);

    return res.json({
      pet,
    });
  } catch (e) {
    console.log(e);
    return res.status(404).json({
      success: false,
      message: "Not Found",
    });
  }
}

async function getPetAndUser(req, res) {
  try {
    const id = await req.params["id"];
    console.log(id);
    const pet = await PetsDAO.getPetById(new ObjectId(id));
    token = await req.headers.authorization;
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UsersDAO.getUserById(new ObjectId(verified.user_id));
    return res.json({
      pet,
      user,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "unknown error",
    });
  }
}

async function saveAdoptFosterDeleteReturn(req, res) {
  try {
    const id = await req.params["id"];
    const pet = await PetsDAO.getPetById(new ObjectId(id));
    token = await req.headers.authorization;
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log(pet);
    console.log(id);
    if (req.body.action === "Save") {
      await UsersDAO.savePet(new ObjectId(verified.user_id), id);
    }
    if (req.body.action === "Adopt" && pet.available === true) {
      await UsersDAO.adoptPet(new ObjectId(verified.user_id), id);
      await PetsDAO.petNotAvailable(new ObjectId(id));
      await UsersDAO.deleteSaved(new ObjectId(verified.user_id), id);
    }
    if (req.body.action === "Foster" && pet.available === true) {
      await UsersDAO.fosterPet(new ObjectId(verified.user_id), id);
      await PetsDAO.petNotAvailable(new ObjectId(id));
      await UsersDAO.deleteSaved(new ObjectId(verified.user_id), id);
    }
    if (req.body.action === "Delete") {
      await UsersDAO.deleteSaved(new ObjectId(verified.user_id), id);
    }
    if (req.body.action === "Return" && pet.available === false) {
      await PetsDAO.petAvailable(new ObjectId(id));
      await UsersDAO.returnPet(new ObjectId(verified.user_id), id);
    }
    return res.json({});
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "unknown error",
    });
  }
}

app.get("/lastsession", lastSession);

app.post("/signIn", registerValidation, register);

app.post("/login", loginValidation, login);

app.post("/addpet", isAdmin, upload.single("file"), addPet);

app.get("/pets", isAdmin, getAllPets);

app.get("/users", isAdmin, getAllUsers);

app.get("/pet/:id", isLogged, getPet);

app.put("/pet/:id", isAdmin, upload.single("file"), editPet);

app.get("/user", isLogged, getUser);

app.put("/user/:id", isLogged, editUser);

app.post("/petbytype", getPetByType);

app.post("/petadvanced", getPetAdvanced);

app.post("/mypets", isLogged, getMyPets);

app.get("/petanduser/:id", isLogged, getPetAndUser);

app.post("/safpet/:id", isLogged, saveAdoptFosterDeleteReturn);

app.listen(3001, async () => {
  console.log("Server is running on port 3001");
});

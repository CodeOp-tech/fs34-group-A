/* Routes: 
    1. Get user table details        = router.get("/", async function (req, res, next)
    2. Get user by id                = router.get("/:id", async function (req, res, next)
    3. Register New User             = router.post("/register", async (req,res)
    4. Check if email already exists = router.post("/check", async (req, res)
    5. Login with token              = router.post("/login", async (req, res)
*/
var express = require("express");
var router = express.Router();
const models = require("../models");
var jwt = require("jsonwebtoken");//newly added
var bcrypt = require("bcrypt");//newly added
const saltRounds = 10; //newly added
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn") //newly added
const supersecret = process.env.SUPER_SECRET;
const { User } = require('../models');

// Postman Test = OK (http://localhost:4000/api/users)
router.get("/", async function (req, res, next) {
    try {
        const user = await models.User.findAll();
        res.send(user);
      } catch (error) {
        res.status(500).send(error);
      }
});

// post 
// router.post("/", async function (req, res, next) {
//     const { username } = req.body;
//     try {
//         const user = await models.User.create( { username } );
//         res.send(user);
//       } catch (error) {
//         res.status(500).send(error);
//       }
// });

// get one by id
// Postman Test = OK (http://localhost:4000/api/users/1)
router.get("/:id", async function (req, res, next) {
    const { id } = req.params;
    try {
        const user = await models.User.findOne({
            where: {
              id,
            },
        });
        res.send(user);
      } catch (error) {
        res.status(500).send(error);
      }
});


// Shrudhi: 

// This is to register
// Postman Test = OK (http://localhost:4000/api/users/register)
router.post("/register", async (req,res) => {
  const { username, email, password } = req.body;
  
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    const user = await models.User.create({ username, email, password: hash });
    res.status(201).send({ user, message: "Registration successful" });
  } catch (error) {
    res.status(500).send(error);
  }
});


//This is to double check if the email address already exists in the database. 
// Postman Test = OK (http://localhost:4000/api/users/email)
router.post("/email", async (req, res) => {
  const { email } = req.body;

  try {
    // Query the database to check if the email already exists
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) { // or existingUser.data.length > 0
      // Email already exists, send a response indicating it's in use
      res.json({ exists: true, message: "Email already in use" });
    } else {
      // Email is available, send a response indicating it's not in use
      res.json({ exists: false, message: "Email available" });
    }
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error("Error checking email:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//This is for logging in.
// Postman Test = OK (http://localhost:4000/api/users/login)
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

try {
  // Find the user by username in the database
  const user = await User.findOne({ where: { username } });

  if (!user) {
    throw new Error("User does not exist");
  }

  // Compare the password with the hashed password stored in the database
  const correctPassword = await bcrypt.compare(password, user.password);

  if (!correctPassword) {
    throw new Error("Incorrect password");
  }

  // Generate a JWT token for authentication
  const token = jwt.sign({ userId: user.id }, supersecret);

  res.send({ message: "Login successful, here is your token", token });
} catch (err) {
  console.error("Login failed:", err);
  res.status(401).json({ success: false, message: "Invalid credentials" });
}
});


module.exports = router;
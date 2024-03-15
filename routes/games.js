/* Routes: (include user should be logged guard in all)
    1. Get Router to fetch API (based on api data)
    2. Game Creation & Participation Creation  =  POST request to update Game Table solution based on userID & update Participation table  

*/

var express = require("express");
var router = express.Router();
const models = require("../models");
const axios = require('axios'); //
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn") //
const { User } = require('../models');
const EMAIL_USER = process.env.EMAIL_USER;//
const EMAIL_PASS = process.env.EMAIL_PASS;//
const nodemailer = require('nodemailer');


//This retrieves the whole games table data
// Postman Test = OK (http://localhost:4000/api/games)
router.get("/", userShouldBeLoggedIn, async (req, res, next) => {
    try {
        const game = await models.Game.findAll();
        res.send(game);
      } catch (error) {
        res.status(500).send(error);
      }
});

//post - get user id from token
// router.post("/", async function (req, res, next) {
//     const { solution } = req.body;
//     const userId = req.userId; // User ID extracted from the token
//     try {
//         const game = await models.Game.create( { solution } );
//         // add players to game. Does the user exist. If so add
//         // if user does not exist still add to participants, userid null but add email to email column
//         res.send(game);
//       } catch (error) {
//         res.status(500).send(error);
//       }
// });

//This finds a game based on game Id (not sure if needed)
// Postman Test = OK (http://localhost:4000/api/games/1)
router.get("/:id", userShouldBeLoggedIn, async (req, res, next) => {
    const { id } = req.params;
    try {
        const games = await models.Game.findOne({
            where: {
              id,
            },
        });
        res.send(games);
      } catch (error) {
        res.status(500).send(error);
      }
});

// create a new game for this participant by id. need to check name or if username/puzzle name. 
// use token
// 
// router.post("/:id/games", async function (req, res, next) {
//     const { id } = req.params;
//     const { username } = req.body;
//     try {
//         const participant = await models.Participation.findOne({
//             where: {
//               id,
//             },
//         });

//         if (!participant) {
//             return res.status(404).send("Participant not found");
//         }
//         // what is name - the name of the user or name of the game
//         const game = await participant.createGame( { username } );

//         res.send(game);
//       } catch (error) {
//         res.status(500).send(error);
//       }
// });

/*  // shrudhi
    1. We use the userShouldBeLoggedIn middleware function to ensure that users are authenticated before accessing the route.
    2. We do a post request which expects the request body to contain an array of email addresses (emails).
    3. Game Creation: 
        - The route calls an external API to fetch a solution, presumably related to a game.
        - It creates a new game record in the database using the fetched solution and the user ID extracted from the authentication token.
        - Game record creation is performed using Sequelize's create() method. 
    4. Participation Creation: 
        - For each email provided in the request, the route creates a participation record in the database.
        - If a user with the provided email exists, their user ID is associated with the participation record. 
          Otherwise, the user ID remains null (we initialize it as null first).
        - Participation records creation is performed using Sequelize's create() method.
        - Multiple participation records are created in parallel using Promise.all() to handle asynchronous creation.
*/



const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_USER,  //how is the .env file supposed to look
    pass: EMAIL_PASS, /// this
  },
});

async function sendEmail(email, gameId) {
  let joiningLink = `http://yourhomepage.com${gameId}`; // Send them to the gameId, front end logic for authentication will redirect them to the game
  const invitation = {
    from: `<${EMAIL_USER}>`, ///this 
    to: email,
    subject: 'You are invited to a new game!',
    text: `I am glad to invite you to join the WordQuest game. Join the game by clicking on the link: ${joiningLink}`,
  };
  try {
    const info = await transporter.sendMail(invitation); ///CHECK!!!
    console.log({ message :'Email sent!', response: info.response});
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Postman Test = OK (http://localhost:4000/api/games)
router.post("/", userShouldBeLoggedIn, async (req, res, next) => {
  const userId = req.userId; // User ID extracted from the token
  const { emails } = req.body; // Remove username

  try {
      // Call external API to fetch solution
      const apiResponse = await axios.get(`https://random-word-api.vercel.app/api?words=1&type=capitalized`);
      const solution = apiResponse.data[0]; // Assuming the API response is an array of words, and we extract the first one

      // Create a new game with the provided solution
      const game = await models.Game.create({ solution, userId });

        // Create participation records for each email.
        // We expect an array of emails in the request body instead of a single email.
        // We iterate over each email in the emails array using Array.map() and create a participation record for each email.
        // We use Promise.all() to asynchronously create all participation records and wait for all promises to resolve.
        await Promise.all(emails.map(async (email) => {
          let participantUserId = null; // Initialize participantUserId as null

          // Check if the user with the provided email exists
          // If a user exists, we set the userId for the participation record; otherwise, it remains null.
          const user = await models.User.findOne({ where: { email } });
          if (user) {
              participantUserId = user.id; // Set participantUserId if user exists
          }

          //send email 
          //await sendEmail(email, game.id);
          // Create a new participation record
          return models.Participation.create({ userId: participantUserId, gameId: game.id, email });
      }));

      res.send(game);
  } catch (error) {
      res.status(500).send(error);
  }
});

//Postman Test = OK (http://localhost:4000/api/games)
// router.post("/", userShouldBeLoggedIn, async (req, res, next) => {
//   const userId = req.userId; // User ID extracted from the token
//   const { emails } = req.body; // Remove username

//   try {
//       // Call external API to fetch solution
//       const apiResponse = await axios.get(`https://random-word-api.vercel.app/api?words=1&type=capitalized`);
//       const solution = apiResponse.data[0]; // Assuming the API response is an array of words, and we extract the first one

//       // Create a new game with the provided solution
//       const game = await models.Game.create({ solution, userId });

//         // Create participation records for each email.
//         // We expect an array of emails in the request body instead of a single email.
//         // We iterate over each email in the emails array using Array.map() and create a participation record for each email.
//         // We use Promise.all() to asynchronously create all participation records and wait for all promises to resolve.
//         await Promise.all(emails.map(async (email) => {
//           let participantUserId = null; // Initialize participantUserId as null

//           // Check if the user with the provided email exists
//           // If a user exists, we set the userId for the participation record; otherwise, it remains null.
//           const user = await models.User.findOne({ where: { email } });
//           if (user) {
//               participantUserId = user.id; // Set participantUserId if user exists
//           }
//           // Create a new participation record
//           return models.Participation.create({ userId: participantUserId, gameId: game.id, email });
//       }));

//       res.send(game);
//   } catch (error) {
//       res.status(500).send(error);
//   }
// });

      // const apiResponse = await axios.get(`https://random-word-api.vercel.app/api?words=1&type=capitalized=${process.env.API_KEY}&${query}`);
      // const solution = apiResponse.data.solution; // Assuming the API response contains a solution
module.exports = router;

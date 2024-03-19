/* Routes: (include user should be logged guard in all)
    1. Get Router to fetch list.
    2. Participation Table Update  =  PUT request to update score and completed at. 
    3. Participation Table Update  =  PUT request to update userId once player clicks join game button after registering.   

*/

var express = require("express");
var router = express.Router();
const models = require("../models");
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
const { User } = require('../models');
const { Game } = require('../models');
const { sequelize } = require('../models');


// Postman Test = OK (http://localhost:4000/api/participation)
router.get("/", userShouldBeLoggedIn, async (req, res, next) => {
    try {
        const participations = await models.Participation.findAll( {include: models.Game} );
        res.send(participations);
      } catch (error) {
        res.status(500).send(error);
      }
});


// Postman Test = OK (http://localhost:4000/api/participation/1/games)
// This is to filter the games which have not been played yet. 
// We retrieve the participation table based on userId and filter the rows where completedAt =null and fetch the gameIds.
// router.get("/invitations", userShouldBeLoggedIn, async (req, res, next) => {
//   const userId = req.userId; 

//   try {
//     const games = await models.Game.findAll({
//       include: {
//         model: models.Participation,
//         where: {
//           userId: userId,
//           completedAt: null,
//         },
//       },
//     });

//     res.send(games);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// router.get("/invitations", userShouldBeLoggedIn, async (req, res, next) => {
//   const userId = req.userId; 

//   try {
//     const invitations = await models.Participation.findAll({
//       where: {
//         userId: userId,
//         completedAt: null, // Assuming completedAt signifies if the invitation is pending or accepted
//       },
//       include: {
//         model: models.Game // Optionally include the game details associated with the invitation
//       }
//     });

//     res.send(invitations);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });


// Postman Test = OK (http://localhost:4000/api/participation/invitations) fetches invitations with the game id
router.get("/invitations", userShouldBeLoggedIn, async (req, res, next) => {
  const userId = req.userId; 

  try {
    const invitations = await models.Participation.findAll({
      where: {
        userId: userId,
        completedAt: null, // Assuming completedAt signifies if the invitation is pending or accepted
      },
      include: [
        {
          model: models.Game,
          include: models.User // Include the User model to fetch the user's information
        }
      ]
    });

    res.send(invitations);
  } catch (error) {
    res.status(500).send(error);
  }
});


// Postman Test = OK (http://localhost:4000/api/participation/played)// To get total games played and total score!
router.get("/played", userShouldBeLoggedIn, async (req, res, next) => {
  const userId = req.userId;

  try {
    // Fetch all participation records for the specified userId
    const participations = await models.Participation.findAll({
      where: {
        userId: userId,
        completedAt: { [models.Sequelize.Op.not]: null } // Fetch only completed participation records
      },
      attributes: ['score'] // Include only the score attribute
    });

    // Calculate the total number of games played
    const totalGamesPlayed = participations.length;

    // Calculate the accumulated score
    let totalScore = 0;
    participations.forEach(participation => {
      totalScore += participation.score || 0; // Add score to totalScore, default to 0 if score is null
    });

    // Send the response with the total games played and accumulated score
    res.json({
      totalGamesPlayed: totalGamesPlayed,
      totalScore: totalScore
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Postman Test = OK (http://localhost:4000/api/participation/scores)// To get total games played and total score!
router.get("/scores", userShouldBeLoggedIn, async (req, res, next) => {
    const userId = req.userId;
  
    try {
      // Fetch all participation records for the specified userId
      const participations = await models.Participation.findAll({
        // where: {
        //   userId: userId
        // },
        attributes: [
          'userId',
          [
            sequelize.literal(`SUM(score)`),
            'totalScore'
          ],
          [
            sequelize.literal(`COUNT(DISTINCT score)`),
            'totalGamesPlayed'
          ]
        ],
        include: [
          {
            model: models.User,
            attributes: ['username'] // Include only the username attribute
          }
        ],
        group: ['userId']
      });
    
      // Send the response with the total games played and accumulated score for each user
      res.json(participations);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// get request to see if the game has been played or not
// the "/:id" is the Game ID
router.get("/:id", userShouldBeLoggedIn, async (req, res, next) => {
  const gameId = req.params.id;
  const userId = req.userId; // Assuming you have user information attached to the request
  
  try {
    const participation = await models.Participation.findOne({
      where: {
        gameId: gameId,
        userId: userId
      }
    });

    if (participation) {
      if(participation.completedAt !== null){
      res.send({ message: "yes" });
    } else {
      res.send({ message: "no" });
    }
    } else {
      res.send({ message: "not found" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});


//  to create an endpoint to update a participant's play information
// Postman Test = OK (http://localhost:4000/:id/play)
// router.put('/:id/play', userShouldBeLoggedIn, async (req, res) => {
//   const { id } = req.params;
//   const { score, completedAt } = req.body;

//   try {
//     // Find the participant with the specified ID and include the associated Game with userId check
//     const participation = await models.Participation.findOne({
//       where: {
//         id,
//       },
//       include: {
//         model: Game,
//         where: {
//           userId: req.userId,
//         },
//       },
//     });

//     // Update the participant's score and completion date
//     await participation.update({ score, completedAt });

//     res.send(participation);
//   } catch (err) {
//     console.error('Error updating participation:', err);
//     res.status(500).send(err);
//   }
// });


router.put('/play/:gameId', userShouldBeLoggedIn, async (req, res) => {
  const { score, completedAt } = req.body;
  const { gameId } = req.params;

  try {
    // Find the participation record to update
    let participation = await models.Participation.findOne({
      where: {
        userId: req.userId,
        gameId,
      }
    });

    // Update the participation record
    await participation.update({ score, completedAt });

    // Fetch the updated participation record
    participation = await models.Participation.findOne({
      where: {
        userId: req.userId,
        gameId,
      }
    });

    res.send(participation);
  } catch (err) {
    console.error('Error updating participation:', err);
    res.status(500).send(err);
  }
});


/*   shrudhi
    This route updates the userId for new players.
*/
// Postman Test = OK (http://localhost:4000/api/participation/:id)
router.put("/:id", userShouldBeLoggedIn, async (req, res, next) => {
  const { id } = req.params;
  const userId = req.userId; // User ID extracted from the token

  try {
      // Update the userId in the participation table where it's currently null for the specified id
      await models.Participation.update({ userId },{ where: { id, userId: null } });

      res.send({message : "User ID updated successfully"});
      //wrap in an object with message 
  } catch (error) {
      res.status(500).send(error);
  }
});

module.exports = router;

// post 
// router.post("/", async function (req, res, next) {
//     const { name } = req.body;
//     try {
//         const participants = await models.Participant.create( { name } );
//         res.send(participants);
//       } catch (error) {
//         res.status(500).send(error);
//       }
// });

// get one by id
// router.get("/:id", async function (req, res, next) {
//     const { id } = req.params;
//     try {
//         const participants = await models.Participant.findOne({
//             where: {
//               id,
//             },
//             include: models.Game,
//         });
//         res.send(participants);
//       } catch (error) {
//         res.status(500).send(error);
//       }
// });

// get all games by participant id

// router.get("/:id/games", async function (req, res, next) {
//     const { id } = req.params;
  
//     try {
//         const participants = await models.Participant.findOne({
//             where: {
//               id,
//             },
//         });

//         if (!participants) {
//             return res.status(404).send("Participant not found");
//         }
     
//         const games = await participants.getGames();

//         res.send(games);
//       } catch (error) {
//         res.status(500).send(error);
//       }
// });


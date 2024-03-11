var express = require("express");
var router = express.Router();
const models = require("../models");

router.get("/", async function (req, res, next) {
    try {
        const game = await models.Game.findAll();
        res.send(game);
      } catch (error) {
        res.status(500).send(error);
      }
});

// post - get user id from token
router.post("/", async function (req, res, next) {
    const { solution } = req.body;
    // const userId = req.userId; // User ID extracted from the token
    try {
        const game = await models.Game.create( { solution } );
        // add participants to game
        res.send(game);
      } catch (error) {
        res.status(500).send(error);
      }
});

// get one by id
router.get("/:id", async function (req, res, next) {
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
router.post("/:id/games", async function (req, res, next) {
    const { id } = req.params;
    const { username } = req.body;
    try {
        const participant = await models.Participant.findOne({
            where: {
              id,
            },
        });

        if (!participant) {
            return res.status(404).send("Participant not found");
        }
        // what is name - the name of the user or name of the game
        const game = await participant.createGame( { username } );

        res.send(game);
      } catch (error) {
        res.status(500).send(error);
      }
});

module.exports = router;

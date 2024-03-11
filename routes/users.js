var express = require("express");
var router = express.Router();
const models = require("../models");

router.get("/", async function (req, res, next) {
    try {
        const user = await models.User.findAll();
        res.send(user);
      } catch (error) {
        res.status(500).send(error);
      }
});

// post 
router.post("/", async function (req, res, next) {
    const { username } = req.body;
    try {
        const user = await models.User.create( { username } );
        res.send(user);
      } catch (error) {
        res.status(500).send(error);
      }
});

// get one by id
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



module.exports = router;

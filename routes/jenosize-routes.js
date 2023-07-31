const express = require("express");
const { getShop,searchPlace,gameNumber24,postMove,getBoardGameXO } = require("../controllers/jenosizeController");
const validateAPIKey = require("../middleware/index");

const router = express.Router();

router.get("/shops", getShop);
router.get("/restaurants", searchPlace);
router.post("/game24", gameNumber24);
router.get("/gamexo", getBoardGameXO);
router.post("/gamexo/move", postMove);


module.exports = {
  routes: router,
};

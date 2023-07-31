const express = require("express");
const {
  loginWithGoogle,
  loginWithFacebook,
  loginWithEmail,
} = require("../controllers/loginController");
const validateAPIKey = require("../middleware/index");

const router = express.Router();

router.post("/login/google", validateAPIKey, loginWithGoogle);
router.post("/login/facebook", validateAPIKey, loginWithFacebook);
router.post("/login/email", validateAPIKey, loginWithEmail);

module.exports = {
  routes: router,
};

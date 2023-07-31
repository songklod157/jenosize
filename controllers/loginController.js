const axios = require("axios");
const admin = require("../firebase-config");
const config = require("../config");

const loginWithGoogle = async (req, res) => {
  try {
    const { accessToken } = req.body;
    const payload = {
      postBody: `id_token=${accessToken}&providerId=google.com`,
      requestUri: "http://localhost",
      returnIdpCredential: true,
      returnSecureToken: true,
    };

    const response = await axios.post(
      `${config.firebaseIDP}?key=${config.firebaseConfig.apiKey}`,
      payload
    );
    res.json({ user: response.data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const loginWithFacebook = async (req, res) => {
  try {
    const { accessToken } = req.body;
    const payload = {
      postBody: `access_token=${accessToken}&providerId=facebook.com`,
      requestUri: "http://localhost",
      returnIdpCredential: true,
      returnSecureToken: true,
    };

    const response = await axios.post(
      `${config.firebaseIDP}?key=${config.firebaseConfig.apiKey}`,
      payload
    );
    res.json({ user: response.data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    const payload = {
      email,
      password,
      returnSecureToken: true,
    };

    const response = await axios.post(
      `${config.firebaseAuth}?key=${config.firebaseConfig.apiKey}`,
      payload
    );
    res.json({ user: response.data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  loginWithGoogle,
  loginWithFacebook,
  loginWithEmail,
};

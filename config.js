"use strict";
const dotenv = require("dotenv");
const assert = require("assert");

dotenv.config();

const {
  PORT,
  HOST,
  HOST_URL,
  AUTH_DOMAIN,
  API_KEY,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  FIREBASE_IDP_BASE_URL,
  FIREBASE_AUTH_BASE_URL,
  GOOGLE_API_KEY,
  GOOGLE_PLACES_API,
} = process.env;

assert(PORT, "PORT is required");
assert(HOST, "HOST is required");

module.exports = {
  firebaseIDP: FIREBASE_IDP_BASE_URL,
  firebaseAuth: FIREBASE_AUTH_BASE_URL,
  port: PORT,
  host: HOST,
  url: HOST_URL,
  firebaseConfig: {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
    measurementId: "G-JKP1XNQMX5",
  },
  googleConfig: {
    apiKey: GOOGLE_API_KEY,
    PlacesApi:GOOGLE_PLACES_API
  },
};

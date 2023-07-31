const config = require("../config");

const validateAPIKey = (req, res, next) =>{
    const apiKey = req.headers['api-key'];
    const validAPIKey = config.firebaseConfig.apiKey; 
    if (!apiKey || apiKey !== validAPIKey) {
      return res.status(401).json({ error: 'Invalid API key' });
    }
  
    next();
  }
  module.exports = validateAPIKey;
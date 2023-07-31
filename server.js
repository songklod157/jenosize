const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config");
const jenosizeRoutes = require("./routes/jenosize-routes")
const loginRoutes = require("./routes/login-routes")

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use('/api', jenosizeRoutes.routes);
app.use('/api', loginRoutes.routes);
app.listen(config.port,() => console.log('listening on port ' + config.port));

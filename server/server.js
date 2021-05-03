const express = require("express");
const app = express();
require('dotenv').config();
const PORT = 8080 || process.env.PORT;

app.listen(PORT, () => {
  console.log("Server started listening on port " + PORT);
});
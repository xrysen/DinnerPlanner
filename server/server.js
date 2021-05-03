const express = require("express");
const app = express();
require('dotenv').config();
const db = require("../db/db");
const PORT = 8080 || process.env.PORT;

app.get("/test", db.getAllTypes);

app.listen(PORT, () => {
  console.log("Server started listening on port " + PORT);
});
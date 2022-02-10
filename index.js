const express = require("express");
const app = express();
const path = require("path");

// CONFIG
const { port } = require("./src/configs");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "src/public")));
app.set("views", path.join(__dirname, "src/views"));

// Router
app.use(require("./src/routers"));

app.listen(port, () => {
  console.log(`Servidor run in port: ${port}`);
});

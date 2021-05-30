const express = require("express");
const path = require("path");
require("./db/mongoose");

const { PORT } = require("./config/index");

const employeeRoutes = require("./routes/employee");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "/public")));

app.set("views", path.join(__dirname, "/views/"));
app.set("view engine", "ejs");

app.use("/employee", employeeRoutes);

app.listen(PORT, () => {
  console.log(`\nServer is live at port ${PORT}`);
});

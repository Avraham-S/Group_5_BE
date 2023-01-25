const express = require("express");
const PORT = 8080;
const app = express();
const signup = require("./routs/signup");
const login = require("./routes/login");
const search = require("./routes/search");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/signup", signup);
app.use("/login", login);
app.use("/search", search);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

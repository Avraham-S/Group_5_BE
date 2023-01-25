const { v4: uuidv4 } = require("uuid");
const express = require("express");
const router = express.Router();
const { checkEmail, supabase } = require("../db_models");
const bcrypt = require("bcrypt");
router.post("/", checkEmail, async (req, res) => {
  //   console.log(req.body);
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(`${req.body.password}`, salt);
  const user = { ...req.body, password: hashedPassword, id: uuidv4() };
  supabase
    .from("users")
    .insert(user)
    .then((res) => {
      console.log("res", res);
    });
  res.send({ userId: user.id });
});
module.exports = router;

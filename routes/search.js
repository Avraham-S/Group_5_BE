const express = require("express");
const router = express.Router();
const { searchBook } = require("../db_models");
router.post("/search", searchBook, (req, res) => {
  res.send(req.books);
});
module.exports = router;

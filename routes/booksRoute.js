const express = require("express");
const {
  addReadBookModel,
  removeReadBook,
  getUsersBooks,
  supabase,
  getBookById,
} = require("../db_models");
const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const { bookId, userId } = req.body;
    const data = await addReadBookModel(bookId, userId);

    res.send(true);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const { id } = req.query;
    const result = await getBookById(id);
    res.send(result.data[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.delete("/remove", async (req, res) => {
  try {
    const { bookId, userId } = req.body;
    const data = await removeReadBook(bookId, userId);
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/users-books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getUsersBooks(id);
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = router;

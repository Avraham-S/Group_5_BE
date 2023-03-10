const express = require("express");
const axios = require("axios");
const {
  addReadBookModel,
  removeReadBook,
  getUsersBooks,
  supabase,
  getBookById,
} = require("../db_models");
const router = express.Router();

router.post("/getRecomendation", async (req, res) => {
  try {
    // const { data } = await axios.post(
    //   "http://3.71.34.182:8080/predict_churn",
    //   req.body
    // );
    // res.send(data);
    const bookList = await Promise.all(
      req.body.key1.map(async (id) => {
        const { data } = await getBookById(id);
        console.log("mapdata:", data[0]);
        return data[0];
      })
    );

    res.send(bookList);
  } catch (error) {
    res.status(500).send(error);
    console.error(error);
  }
});

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

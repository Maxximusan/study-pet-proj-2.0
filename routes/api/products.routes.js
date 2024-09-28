//Тренировочный файл

const express = require("express");
const { v4 } = require("uuid");
const products = require("./data/example-products");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    status: "success",
    code: 200,
    data: {
      result: products,
    },
  });
});
router.get("/:id", (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const result = products.find((item) => item._id === id);

  if (!result) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: `Product with id=${id} not found`,
    });
  }
});

//ДОБАВИТЬ
router.post("/", (req, res) => {
  console.log(req.body);
  const newProduct = { ...req.body, id: v4() };
  products.push(newProduct);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result: newProduct,
    },
  });
});
module.exports = router;

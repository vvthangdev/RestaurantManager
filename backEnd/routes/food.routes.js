const foodController = require("../controllers/food.controller")
const express = require('express');

const router = express.Router();
router.get("/menu", foodController.getAllFoods);
router.get("/menu/search/:words", foodController.searchFoods);
router.get("/menu/food/:foodId", foodController.getFoodById);
router.post("/admin/createfood", foodController.createNewFood);
router.delete("/admin/deletefood/:foodId", foodController.deleteFood);
router.put("/admin/updatefood/:foodId", foodController.updateFood);
//router.get("/menu/asf", foodController.getFoodById);
module.exports = router;
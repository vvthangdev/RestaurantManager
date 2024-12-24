const foodController = require("../controllers/food.controller")
const admin = require("../middlewares/admin.mid.js");
const auth = require('../middlewares/auth.mid.js');
const express = require('express');

const router = express.Router();
router.get("/menu", foodController.getAllFoods);
router.get("/menu/search/:words", foodController.searchFoods);
router.get("/menu/food/:foodId", foodController.getFoodById);
router.get("/admin/menu", auth, foodController.getAllFoods);
router.get("/admin/menu/search/:words", auth, foodController.searchFoods);
router.get("/admin/menu/food/:foodId", auth, foodController.getFoodById);
router.post("/admin/createfood", auth, foodController.createNewFood);
router.delete("/admin/deletefood/:foodId", auth, foodController.deleteFood);
router.put("/admin/updatefood/:foodId", auth, foodController.updateFood);
//router.get("/menu/asf", foodController.getFoodById);
module.exports = router;
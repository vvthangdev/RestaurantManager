const Foods = require("../models/foods.model.js");
const { Op } = require('sequelize');
require("dotenv").config();
const foodService = require("../services/food.service.js");
const getAllFoods = async (req, res) => {
  try {
    const foods = await foodService.getAllFoods();

    //console.log(foods) // Lấy tất cả các bản ghi trong bảng foods
    res.json({
      // success: true,
      foods: foods
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
const searchFoods = async (req, res) => {
  const { words } = req.params;  // Lấy từ khóa tìm kiếm từ tham số URL
  try {
    // Truy vấn tìm món ăn có tên chứa từ khóa 'words'
    // const foods = await Foods.findAll({
    //   where: {
    //     name: {
    //       [Op.like]: `%${words}%`,  // Tìm kiếm có LIKE trong cơ sở dữ liệu
    //     },
    //   },
    // });
    foods = await foodService.searchFoods(words);
    if (foods.length === 0) {
      return res.status(200).json(foods)
    }

    // Trả về kết quả tìm kiếm
    return res.status(200).json(foods);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
}

const getFoodById = async (req, res) => {
  const {foodId} = req.params;
  try{
    const food = await foodService.getFoodById(foodId - 0);
 
    return res.status(200).json(food);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
}

const createNewFood = async (req, res) => {
  try {
        const food = req.body; 
        console.log(food)
        const newFood = await foodService.createNewFood(food);
        res.status(201).send(newFood);
    } catch (error) {
        res.status(500).json({
            message: "Error creating food",
            error: error.message,
        });
    }
}

const deleteFood = async (req, res) => {
  try{
    const {foodId} = req.params;
    const result = await foodService.deleteFood(foodId - 0);
    if(result === 1) {
      res.status(200).json({
        message: "Food deleted successfully!",
      });
    }
  }catch (error) {
        res.status(500).json({
            message: "Error deleting food",
            error: error.message,
        });
    }
} 

const updateFood = async (req, res) => {
  try{
      const foodId = req.params.foodId;
      console.log(foodId)
      const food = req.body;
      const foodUpdate = await foodService.updateFood(foodId, food);
        res.status(201).json({
            message: "Food updated successfully!",
            data: foodUpdate,
        });

  } catch (error) {
        res.status(500).json({
            message: "Error Updating food",
            error: error.message,
        });
    }
}
module.exports = {
  getAllFoods,
  searchFoods,
  getFoodById,
  createNewFood,
  deleteFood,
  updateFood,
};

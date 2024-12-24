const Foods = require("../models/foods.model.js");
const { Op } = require('sequelize');


let getAllFoods = async () => {
    try {
        const foods = await Foods.findAll();  // Sử dụng await để đợi kết quả
        return foods;  // Trả về kết quả cho controller
    } catch (error) {
        throw new Error("FAILED: " + error.message);  // Ném lỗi nếu có
    }
};
let searchFoods = async (words) => {
    try{
        const foods = await Foods.findAll({
            where : {
                name : {
                    [Op.like] : `%${words}%`
                },
            },
        });
        return foods;
    } catch(error){
        throw new Error("FAILED: " + error.message);
    }
}

let getFoodById = async (foodId) =>{

    try{
        const food = await Foods.findOne({ where: { id: foodId } });
        console.log(food)
        return food['dataValues'];
    } catch(error){
        throw new Error("FAILED: " + error.message);
    }
}

let createNewFood = async (food) => {
    try {
        const newFood = await Foods.create(food);
        return newFood;
    } catch(error){
        throw new Error("FAILED to create food: " + error.message);
    }
}
// Xóa món ăn

let deleteFood = async (foodId) => {
    try{

        const food = await Foods.findOne({ where: { id : foodId } });
        if (!food) {
          throw new Error("Food not found");
        }
        await Foods.destroy({
          where: { id : foodId },
        });
        return 1;
    }catch (error) {
        console.log("Error deleting food: ", error);
        throw new Error("An error occurred while deleting the food.");
    }

}

let updateFood = async (foodId, food) => {
    try {
        const foodUpdate = await Foods.findOne({ where: { id : foodId } });
        if(!foodUpdate){
           throw new Error("Food not found"); 
        }

        await foodUpdate.update({
            name: food.name || foodUpdate.name,
            image: food.image || foodUpdate.image,
            price: food.price || foodUpdate.price,
            description: food.description || foodUpdate.description,
        });
        return {
            message: "Food updated successfully",
            data: foodUpdate,
        };

    } catch (error) {
        return {
            message: "Error updating food",
            error: error.message,
        };
    }
}
module.exports = {
    getAllFoods: getAllFoods,
    searchFoods : searchFoods,
    getFoodById : getFoodById,
    createNewFood : createNewFood,
    deleteFood : deleteFood,
    updateFood : updateFood,
};

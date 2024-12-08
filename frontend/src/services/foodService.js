
//fetch data from API
import axios from "axios";
export const getAll = async () => {
    const res = await axios.get('/api/menu');
    return res.data.foods;
};

export const search = async (searchTerm) => {
    const { data } = await axios.get(`/api/menu/search/${searchTerm}`);
    return data;
};
// export const getAllTags = async () => sample_tags;
// export const getAllByTag = async tag => {
//     if(tag === "All") return getAll();
//     return sample_foods.filter(item => item.tags?.includes(tag));
// };

export const getById = async (foodId) => {
    const {data} = await axios.get(`/api/menu/food/${foodId}`);
    console.log(data);
    return data;
};

export const deleteFoodById = async (foodId) => {
    const {data} = await axios.delete(`/api/admin/deletefood/${foodId}`);
    return data;
}

export const updateFood = async (foodId, food) => {
    await axios.put(`/api/admins/updatefood/${foodId}`, food);
}

export const addFood = async (food) => {
    const {data} = await axios.post("/api/admin/createfood", food);
    return data;
}
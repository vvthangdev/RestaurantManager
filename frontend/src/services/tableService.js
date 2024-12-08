import axios from "axios";

export const getAllTables = async () => {
    const res = await axios.get('/tables');
    return res.data;
};
export const getTableByTableNumber = async (table_number) => {
    const {data} = await axios.get(`/tables/get-table-by-number/${table_number}`);
    console.log(data);
    return data;
};export const updateTable = async (table_number, table) => {
    await axios.put(`/tables/update-table/${table_number}`, table);
};

export const addTable = async (table) => {
    const {data} = await axios.post("/tables/create-table", table);
    return data;
};

export const deleteTableByTableNumber = async (table_number) => {
    const {data} = await axios.delete(`/tables/delete-table/${table_number}`);
    return data;
};


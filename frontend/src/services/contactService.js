import axios from "axios";

export const getAllContacts = async () => {
    const res = await axios.get('/contacts/getAll');
    return res.data.contacts;
};
export const createContact = async (contact) => {
    const {data} = await axios.post("/contacts/create", contact);
    return data;
};

export const deleteContactById = async (contactId) => {
    const {data} = await axios.delete("/contacts/deleteContactById", contactId);
    return data;
}

export const getContactById = async (contactId) => {
    const {data} = await axios.get("/contacts/getContactById", contactId);
    return data;
}
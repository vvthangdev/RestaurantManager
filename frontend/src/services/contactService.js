import axios from "axios";

export const getAllContacts = async () => {
    const res = await axios.get('/contacts/getAll').catch(error => {
    if (error.response && error.response.status === 401) {
        alert("Bạn không có đủ quyền để truy nhập trang này!");
        window.location.href = '/menu';
        localStorage.removeItem('admin');
    }
  });
    return res.data.contacts;
};
export const createContact = async (contact) => {
    const {data} = await axios.post("/contacts/create", contact);
    return data;
};

export const deleteContactById = async (contactId) => {
    console.log(contactId);
    const {data} = await axios.delete(`/contacts/deleteContactById/${contactId}`).catch(error => {
    if (error.response && error.response.status === 401) {
        alert("Bạn không có đủ quyền để truy nhập trang này!");
        window.location.href = '/menu';
        localStorage.removeItem('admin');
    }
  });
    return data;
}

export const getContactById = async (contactId) => {
    const {data} = await axios.get("/contacts/getContactById", contactId).catch(error => {
    if (error.response && error.response.status === 401) {
        alert("Bạn không có đủ quyền để truy nhập trang này!");
        window.location.href = '/menu';
        localStorage.removeItem('admin');
    }
  });
    return data;
}
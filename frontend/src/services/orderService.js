import { wait } from '@testing-library/user-event/dist/utils';
import axios from 'axios';

export const createOrder = async order => {
    //console.log(1);
    //console.log(order);
    try {
      const { data } =await axios.post('/orders/create-order', order);
      return data;
    } catch (e) {
        return {
            errorMessage: e.response.data.error,
            //errorId: e.response.data.errorId
        };
    }
};

export const getAllOrders = async () => {

    const res = await axios.get("/orders/get_all_orders").catch(error => {
    if (error.response && error.response.status === 401) {
        alert("Bạn không có đủ quyền để truy nhập trang này!");
        window.location.href = '/menu';
        localStorage.removeItem('admin');
    }
  });
    return res.data;
}
export const deleteOrderById = async (orderId) => {
    const {data} = await axios.delete(`/orders/delete-order-byId/${orderId}`).catch(error => {
    if (error.response && error.response.status === 401) {
        alert("Bạn không có đủ quyền để truy nhập trang này!");
        window.location.href = '/menu';
        localStorage.removeItem('admin');
    }
  });
    return data;
};

export const getOrderById = async (orderId) => {
    const {data} = await axios.get(`/orders/get-order-byId/${orderId}`).catch(error => {
    if (error.response && error.response.status === 401) {
        alert("Bạn không có đủ quyền để truy nhập trang này!");
        window.location.href = '/menu';
        localStorage.removeItem('admin');
    }
  });
    console.log(data);
    return data;
};

export const updateOrder = async (orderId, order) => {
    await axios.put(`/orders/update-evaluate/${orderId}`, order).catch(error => {
    if (error.response && error.response.status === 401) {
        alert("Bạn không có đủ quyền để truy nhập trang này!");
        window.location.href = '/menu';
        localStorage.removeItem('admin');
    }
  });
};
// export const getNewOrderForCurrentUser = async () => {
//     const { data } = await axios.get('/api/preorder/newOrderForCurrentUser');
//     return data;
// };

// export const trackOrderById = async orderId => {
//     const { data } = await axios.get('/api/preorder/track/' + orderId);
//     return data;
//   };

// export const getAll = async state => {
//     const { data } = await axios.get(`/api/preorder/${state ?? ''}`)
//     return data;
// };
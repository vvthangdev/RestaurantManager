// import axios from 'axios';

// export const createOrder = async order => {
//     try {
//       const { data } = axios.post('/api/preorder/create', order);
//       return data;
//     } catch (error) {}
//   };
  
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
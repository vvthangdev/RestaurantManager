// import Footer from '../../components/Footer/Footer';
// import Header from '../../components/Header/Header';
// import classes from './foodsAdminPage.module.css';

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { deleteFoodById, getAll, search } from "../../services/foodService";
import NotFound from "../../components/NotFound/NotFound";
import { toast, ToastContainer } from "react-toastify";
import classes from './foodsAdminPage.module.css';
import Title from "../../components/Title/Title";
import Search from "../../components/Search/Search";
import Price from "../../components/Price/Price";
import { FaTrash, FaEdit } from 'react-icons/fa';
import HeaderFoodsAdminPage from "../../components/HeaderFoodsAdmin/HeaderFoodsAdmin";
// import NotSignIn from '../../components/NotSignIn/NotSignIn';
// import { logout } from '../../services/userService';
// import { useNavigate, useParams } from 'react-router-dom';
// import HeaderFoodsAdminPage from '../../components/HeaderFoodsAdmin/HeaderFoodsAdmin';
// import ManageFoods from '../../components/ManageFoods/ManageFood';
// import { useEffect, useReducer } from 'react';
// import { getAll, search } from '../../services/foodService';
// import Thumbnails from '../../components/Thumbnails/Thumbnails';

// const initialState = {foods : []};
// const reducer = (state, action) => {
//     switch(action.type){
//         case 'FOODS_LOADED':
//             return{...state, foods : action.payload};
//         default: 
//             return state;
//     }
// }

// export default function FoodsAdminPage(){
//     const [state, dispatch] = useReducer(reducer, initialState);
//     const {foods} = state;
//     const {searchTerm} = useParams();
//     useEffect(() => {
//         const loadFoods = searchTerm ? search(searchTerm) : getAll();
//         loadFoods.then(foods => dispatch({type: "FOODS_LOADED", payload: foods}));
//     }, [searchTerm]);
//     const existingUser = localStorage.getItem('user');
//     const navigate = useNavigate();
//     const handleLogOut = (e) => {
//         logout();
//         navigate("/login");
//     }
//     return (      
//         <>
            
//                 {!existingUser && 
//                 <>
//                     <Header/>
//                     <NotSignIn linkText="SIGN IN"></NotSignIn>
//                     <Footer/>
//                 </>
//                 }
//                 {existingUser &&
//                     <>
//                         <HeaderFoodsAdminPage handleLogout={handleLogOut}/>
//                         <ManageFoods/>
//                         {/* <Thumbnails foods = {foods} /> */}
//                     </>
//                 }
            
//         </>
//     )
// }

const FoodAdminPage = () => {
    const [foods, setFoods] = useState([]);
    const {searchTerm} = useParams();

    useEffect(() => {
        const loadFoods = searchTerm ? search(searchTerm) : getAll();
        loadFoods.then(foods => {
            setFoods(foods);
            console.log(foods);
        }); 

    }, [searchTerm]);
    

    const FoodsNotFound = () => {
        if(foods && foods.length > 0) return;
        return (<NotFound linkRoute="/admin/foods" linkText="Show All" />)
        // ) : (
        //     <NotFound linkRoute="/dashboard" linkText="Back to dashboard!" />
        // );
    };

    const deleteFood = async food => {
        const confirmed = window.confirm(`Bạn có muốn xóa món ${food.name}?`);
        if(!confirmed) return;

        const data = await deleteFoodById(food.id);
        toast.success(`"${food.name}" Đã Được Xóa!`);
        setFoods(foods.filter(f => f.id !== food.id));
    };

    return (
        <>
            <HeaderFoodsAdminPage />
            <div className={classes.container}>
                <div className={classes.list}>
                    <Title title = "Quản lý món ăn" margin = "1rem auto" />
                    <Search 
                        searchRoute="/admin/foods/"
                        defaultRoute="/admin/foods"
                        margin="1rem 0"
                        placeholder="Tìm kiếm món ăn!"
                    />

                    <Link to="/admin/addfood" className={classes.add_food}>
                        Thêm Món +
                    </Link>
                    <FoodsNotFound />
                    {foods &&
                        foods.map(food => (
                            <div key={food.id} className={classes.list_item}>
                                <img src={food.image} alt={food.name} />
                                <Link to={'/menu/food/' + food.id}>{food.name}</Link>
                                <Price 
                                    locale = 'vi-VN'
                                    currency = 'VND'
                                    price={food.price} 
                                />
                                <div className={classes.actions}>
                                    <Link to={'/admin/editfood/' + food.id} ><FaEdit className={classes.edit}/></Link>
                                    <Link onClick={() => deleteFood(food)} ><FaTrash className={classes.delete}/></Link>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </>
    )
}

export default FoodAdminPage;
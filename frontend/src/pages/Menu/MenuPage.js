import React, { useEffect, useReducer } from "react";
import { getAll, search } from "../../services/foodService";
import Thumbnails from "../../components/Thumbnails/Thumbnails";
import { useParams } from "react-router-dom";
import Search from "../../components/Search/Search";
import NotFound from "../../components/NotFound/NotFound";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const initialState = {foods : []};
const reducer = (state, action) => {
    switch(action.type){
        case 'FOODS_LOADED':
            return {...state, foods: action.payload};
            default:
                return state;
    }
}

export default function MenuPage(){
    const [state, dispatch] = useReducer(reducer, initialState);
    const {foods} = state;
    const {searchTerm} = useParams();
   
    useEffect(() => {
        console.log(searchTerm);
        const loadFoods = searchTerm ? search(searchTerm) : getAll();
        
        loadFoods.then(foods => {
            console.log(foods)
            dispatch({type: "FOODS_LOADED", payload: foods})
        });
        console.log(2);
        //console.log(loadFoods);
    }, [searchTerm]); //useEffect tranh goi API moi khi render, tranh anh huong render chinh
    return(
        <>
            <Header/>
            <Search/>
            {foods.length === 0 && <NotFound linkText="Reset Search"></NotFound>}
            {foods.length !== 0 && <Thumbnails foods = {foods} />}
            <Footer/>
        </>
    );
}
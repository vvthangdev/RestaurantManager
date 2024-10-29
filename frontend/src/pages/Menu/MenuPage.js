import React, { useEffect, useReducer } from "react";
import { getAll, search } from "../../services/foodService";
import Thumbnails from "../../components/Thumbnails/Thumbnails";
import { useParams } from "react-router-dom";
import Search from "../../components/Search/Search";
import NotFound from "../../components/NotFound/NotFound";

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
    console.log(searchTerm)
    useEffect(() => {
        const loadFoods = searchTerm ? search(searchTerm) : getAll();
        loadFoods.then(foods => dispatch({type: "FOODS_LOADED", payload: foods}));
    }, [searchTerm]); //useEffect tranh goi API moi khi render, tranh anh huong render chinh
    return(
        <>
            <Search/>
            {foods.length === 0 && <NotFound linkText="Reset Search"></NotFound>}
            {foods.length !== 0 && <Thumbnails foods = {foods} />}
        </>
    );
}
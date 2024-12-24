import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classes from './manageFoods.module.css'
import Title from "../Title/Title";
export default function ManageFoods() {
    const [term, setTerm] = useState('');
    const navigate  =useNavigate();
    const {searchTerm} = useParams();

    useEffect(() => {
        setTerm(searchTerm ?? '');
    }, [searchTerm]);

    const search = async () => {
        term ? navigate('/foodsadminpage/search/' + term) : navigate('/foodsadminpage');
    }

    return (
        <div className={classes.container}>
            <Title title="Manage Foods" margin="2rem auto 1rem 27%" fontSize="1.7rem"/>
            <div className={classes.search}>
                <input
                    type = 'text'
                    placeholder="Search Food!"
                    onChange={e => setTerm(e.target.value)}
                    onKeyUp={e => e.key === 'Enter' && search()}
                    value = {term}
                />
                <button onClick = {search}>Search</button>
            </div>
        </div>
    )
}
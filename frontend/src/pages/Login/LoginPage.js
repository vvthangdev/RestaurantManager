import React, { useEffect, useState } from "react";
import {useForm} from 'react-hook-form';
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Title from "../../components/Title/Title";
import Input from "../../components/Input/Input";
import 'bootstrap/dist/css/bootstrap.css';
import classes from './loginPage.module.css';
import { login, logout } from "../../services/userService";
export default function LoginPage(){
    const navigate = useNavigate();

    useEffect(() => {
        // Kiểm tra xem đã có thông tin người dùng trong local storage chưa
        const existingUser = localStorage.getItem('user');
        if (existingUser) {
            // Nếu đã có user, chuyển hướng đến FoodAdminPage
            //navigate('/login/foodadminpage');
            navigate('/foodsadminpage');
        }
    }, [navigate]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleKeyDown = async (event) => {
        // if (event.key === 'Enter') {
        //     console.log('Button được nhấn Enter');
        //     handleSubmit();
        // }
    };

    const handleSubmit = async (e) =>{
        navigate('/foodsadminpage');
        // console.log(email)
        // console.log(password)
        // const response = await login(email, password);
        // if(response && response.errorId === 0){
        //     //navigate('/login/foodadminpage');
        //     navigate('/foodsadminpage');
        //     return;
        // }
        // if(response.errorId === 1) {
        //     console.log(response.errorMessage);
        //     setError(response.errorMessage);
        // }
    };
    return(
        <>
            
            <section className={`vh-100 ${classes.gradientCustom}`}  onKeyDown={handleKeyDown}>    
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                        <div className="card-body p-5 text-center">

                            <div className="mb-md-5 mt-md-4 pb-5">

                            <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                            <p className="text-white-50 mb-5">Please enter your login and password!</p>

                            <div data-mdb-input-init className="form-outline form-white mb-4">
                                <input type="email" 
                                    className="form-control form-control-lg" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <label className="form-label" for="typeEmailX">Email</label>
                            </div>

                            <div data-mdb-input-init className="form-outline form-white mb-4">
                                <input 
                                    type="password" 
                                    className="form-control form-control-lg" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <label className="form-label" for="typePasswordX">Password</label>
                            </div>

                            {/* <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p> */}
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <button data-mdb-button-init data-mdb-ripple-init 
                                className="btn btn-outline-light btn-lg px-5" type="submit"
                                onClick={handleSubmit}>Login
                            </button>

                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        </>
    );
    
}
// import React, { useEffect, useState } from "react";
// import {useForm} from 'react-hook-form';
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";
// import Title from "../../components/Title/Title";
// import Input from "../../components/Input/Input";
// import 'bootstrap/dist/css/bootstrap.css';
// import classes from './loginPage.module.css';
// import { login, logout } from "../../services/userService";
// export default function LoginPage(){
//     const navigate = useNavigate();

import classes from './loginPage.module.css'
import { useForm } from "react-hook-form";
import Title from "../../components/Title/Title";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
//import Footer from "../../components/Footer/Footer";
//const { default: Header } = require("../../components/Header/Header");
//const { default: HeaderFoodsAdminPage } = require("../../components/HeaderFoodsAdmin/HeaderFoodsAdmin");
//     useEffect(() => {
//         // Kiểm tra xem đã có thông tin người dùng trong local storage chưa
//         const existingUser = localStorage.getItem('user');
//         if (existingUser) {
//             // Nếu đã có user, chuyển hướng đến FoodAdminPage
//             //navigate('/login/foodadminpage');
//             navigate('/foodsadminpage');
//         }
//     }, [navigate]);

//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');

//     const handleKeyDown = async (event) => {
//         // if (event.key === 'Enter') {
//         //     console.log('Button được nhấn Enter');
//         //     handleSubmit();
//         // }
//     };

//     const handleSubmit = async (e) =>{
//         navigate('/foodsadminpage');
//         // console.log(email)
//         // console.log(password)
//         // const response = await login(email, password);
//         // if(response && response.errorId === 0){
//         //     //navigate('/login/foodadminpage');
//         //     navigate('/foodsadminpage');
//         //     return;
//         // }
//         // if(response.errorId === 1) {
//         //     console.log(response.errorMessage);
//         //     setError(response.errorMessage);
//         // }
//     };
//     return(
//         <>
            
//             <section className={`vh-100 ${classes.gradientCustom}`}  onKeyDown={handleKeyDown}>    
//                 <div className="container py-5 h-100">
//                     <div className="row d-flex justify-content-center align-items-center h-100">
//                     <div className="col-12 col-md-8 col-lg-6 col-xl-5">
//                         <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
//                         <div className="card-body p-5 text-center">

//                             <div className="mb-md-5 mt-md-4 pb-5">

//                             <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
//                             <p className="text-white-50 mb-5">Please enter your login and password!</p>

//                             <div data-mdb-input-init className="form-outline form-white mb-4">
//                                 <input type="email" 
//                                     className="form-control form-control-lg" 
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                     required
//                                 />
//                                 <label className="form-label" for="typeEmailX">Email</label>
//                             </div>

//                             <div data-mdb-input-init className="form-outline form-white mb-4">
//                                 <input 
//                                     type="password" 
//                                     className="form-control form-control-lg" 
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                     required
//                                 />
//                                 <label className="form-label" for="typePasswordX">Password</label>
//                             </div>

//                             {/* <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p> */}
//                             {error && <p style={{ color: 'red' }}>{error}</p>}
//                             <button data-mdb-button-init data-mdb-ripple-init 
//                                 className="btn btn-outline-light btn-lg px-5" type="submit"
//                                 onClick={handleSubmit}>Login
//                             </button>

//                             </div>
//                         </div>
//                         </div>
//                     </div>
//                     </div>
//                 </div>
//             </section>
//         </>
//     );
    
// }


const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")
    const navigate = useNavigate();
    const { admin, login } = useAuth();
    const [params] = useSearchParams();
    const returnUrl = params.get('returnUrl');

    useEffect(() => {
        if (!admin) return;

            returnUrl ? navigate(returnUrl) : navigate('/admin/accounts');
        }, [admin]);

    const submit = async ({ email, password }) => {
          await login(email, password);
        };
    

    const handleLogin = async (e) => {
        //e.preventDefault();

        setError("");

        if(!email){
            setError("Vui lòng nhập Email!");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            setError("Email không hợp lệ!");
            return;
        }
        if(!password){
            setError("Vui lòng nhập Mật khẩu!");
            return;
        }else if(password.length < 6){
            setError("Mật khẩu có độ dài ít nhất là 6!");
            return;
        }
        const resutlt = await login(email, password);
        if(resutlt){
            return;

        }else{
            setError("Mật khẩu hoặc Email không đúng!");
        }
    }
    return (
        <>
            <div className={classes.container}>
                <div className={classes.content}>
                    <Title title="Đăng nhập" color = {"black"}/>
                    {/* <form
                        className = {classes.form}
                        onSubmit={handleSubmit(submit)}
                        noValidate
                    >
                        <div>
                        <Title title="Email" fontSize={"1.2rem"} color="black"/>
                        <Input
                            type="email"
                            label="Email"
                            {...register('email', { required: true, minLength: 1 })}
                            error={errors.email}
                            flag={false}
                        />
                        
                        </div>
                        <div>
                        <Title title="Mật khẩu" fontSize={"1.2rem"} color="black"/>
                        <div className={classes.date_and_time}>
                            <Input
                            type="password"
                            label="Mật khẩu"
                            {...register('password', { required: true, min : 1 })}
                            error={errors.password}
                            flag={false}
                            />
                            
                        </div>
                        </div>
                        <Button type="submit" text="Đặt bàn" />
                    </form> */}
                    <div className={classes.infor}>
                        <div className = {classes.email}>
                            <Title title="Email" fontSize={"1.2rem"} color="black"/>
                            <input 
                                className = {classes.emailinput}
                                type = "email"
                                value = {email}
                                placeholder="Email của bạn"
                                onChange={(e) => setEmail(e.target.value)}
                            />

                        </div>
                        <div className = {classes.password}>
                            <Title title="Mật khẩu" fontSize={"1.2rem"} color="black"/>
                            <input 
                                className = {classes.passwordinput}
                                type = "password"
                                value={password}
                                placeholder="Mật khẩu"
                                onChange={(e) => setPassword(e.target.value)}
                            />

                        </div>
                    </div>
                    {error && <p className={classes.error}>{error}</p>
                    }
                    <Button type="submit" text="Đăng nhập" onClick={handleLogin}/>
                </div>
            </div>
        </>

    )
}

export default LoginPage;
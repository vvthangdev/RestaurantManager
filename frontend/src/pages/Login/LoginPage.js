

import classes from './loginPage.module.css'
import { useForm } from "react-hook-form";
import Title from "../../components/Title/Title";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';



const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")
    const navigate = useNavigate();
    const { admin, login } = useAuth();
    const [params] = useSearchParams();
    const returnUrl = params.get('returnUrl');

    useEffect(() => {
        const adminExist = localStorage.getItem('admin');
        if (!adminExist) return;
        
        returnUrl ? navigate(returnUrl) : navigate('/admin/dashboard');
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
        }else if(password.length <1){
            setError("Mật khẩu có độ dài ít nhất là 6!");
            return;
        }
        const resutlt = await login(email, password);
        if(!resutlt){
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
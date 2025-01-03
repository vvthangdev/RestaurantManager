import React from "react";
import InputContainer from "../InputContainer/InputContainer";
import classes from "./input.module.css";
function Input(
    {label, type, defaultValue, onChange, onBlur, name, error, flag = true}, ref
){
    const getErrorMessage = () =>{
        if(!error) return;
        if(error.message) return error.message;
        // eslint-disable-next-line default-case
        switch(error.type){
            case 'required':
                return 'This Field Is Required';
            case 'minLength':
                return 'Field Is Too Short';
            default:
                return '*';
        }
    }
    console.log(error)
    return(
        <InputContainer label = {label} flag = {flag}>
            <input
                defaultValue={defaultValue}
                className={classes.input}
                type={type}
                placeholder={label}
                ref={ref}
                name={name}
                onChange={onChange}
                onBlur={onBlur}
            />
            {error && <div className={classes.error}>{getErrorMessage()}</div>}
        </InputContainer>
    )
}

export default React.forwardRef(Input);
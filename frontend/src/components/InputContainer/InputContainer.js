import classes from './inputContainer.module.css';

export default function InputContainer({label, flag, bgColor, children}){
    return (
        <div className={classes.container} style={{backgroundColor: bgColor}}>
            {flag && <label className={classes.label}>{label}</label> }
            <div className={classes.content}>{children}</div>
         </div>
    )
}

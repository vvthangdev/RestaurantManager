import React from 'react';
import styles from './Infor.module.css';
function Infor(){
    return(
        <body>
            <section className = {styles.container}>
                <div className={styles.aboutus}>
                <div className={styles.aboutusbox}>
                    <div className={styles.aboutuscontent}>
                <h2>About us</h2></div>
                </div>
                </div>
                <div className = {styles.boxinfo}>


                    <div className = {styles.box1}>
                        <div className={styles.boxfood1}></div>
                        <div className={styles.boxcontent1}>
                            <p>Đây là món thịt ngon nhất cửa hàng chúng tôi</p>
                        </div>
                    </div>
                    <div className = {styles.box2}>
                        <div className={styles.boxfood2}></div>
                        <div className={styles.boxcontent2}>
                            <p>Vai ca cac toi het content r </p>
                        
                        </div>
                    </div>
                    <div className = {styles.box3}>
                        <div className={styles.boxfood3}></div>
                        <div className={styles.boxcontent3}>
                            <p>Nha hang lam an nhu con cac</p>
                        </div>
                    </div>
                </div>
            </section>
        </body>
    )
}
export default Infor;
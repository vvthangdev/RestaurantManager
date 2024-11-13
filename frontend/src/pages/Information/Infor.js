import React from 'react';
import styles from './Infor.module.css';
function Infor(){
    return(
        <body>
            <div className={styles.infor_wrapper}>
                <div className={styles.infor_content}>
                    <div className={styles.infor_box } id ='box1'>
                    <div className={styles.infor_box_left}>
                        <div className={styles.infor_box_left_title1}>
                            <p>Quán nhậu nổi tiếng khu BKX</p>
                        </div>
                        <div className ={styles.infor_box_left_des}>
                            <p>Hoho</p>
                            <span>Description bla bla eh oh eh oh ec ec</span>
                        </div>
                        </div>
                    <div className={styles.infor_box_right}>
                        <div className={styles.test}>
                        <div className = {styles.infor_box_right_image}>
                            <i>
                            <img src="https://storage.quannhautudo.com/data/thumb_800/Data/images/product/2023/08/202308051006021532.webp" alt = 'ua sao d chen dc v ae'/>
                            </i>
                        </div>
                        </div>
                        </div>    
                    </div>
                    <div className={styles.infor_box } id ='box2'>
                    <div className={styles.infor_box_left}>
                        <div className={styles.infor_box_left_title1}>
                            <p>Quán nhậu nổi tiếng khu BKX</p>
                        </div>
                        <div className ={styles.infor_box_left_des}>
                            <p>Hoho</p>
                            <span>Description bla bla eh oh eh oh ec ec</span>
                        </div>
                        </div>
                    <div className={styles.infor_box_right}>
                        <div className={styles.test}>
                        <div className = {styles.infor_box_right_image}>
                            <i>
                            <img src="C:\Users\user\Documents\GitHub\RestaurantManager\frontend\src\pages\Contact\bia-hoi-sai-gon-1.jpg" alt = 'ua sao d chen dc v ae'/>
                            </i>
                        </div>
                        </div>
                        </div>    
                    </div>
                    <div className={styles.infor_box } id ='box3'>
                    <div className={styles.infor_box_left}>
                        <div className={styles.infor_box_left_title1}>
                            <p>Quán nhậu nổi tiếng khu BKX</p>
                        </div>
                        <div className ={styles.infor_box_left_des}>
                            <p>Hoho</p>
                            <span>Description bla bla eh oh eh oh ec ec</span>
                        </div>
                        </div>
                    <div className={styles.infor_box_right}>
                        <div className={styles.test}>
                        <div className = {styles.infor_box_right_image}>
                            <i>
                            <img src="https://storage.quannhautudo.com/data/thumb_800/Data/images/product/2023/08/202308051006021532.webp" alt = 'ua sao d chen dc v ae'/>
                            </i>
                        </div>
                        </div>
                        </div>    
                    </div>
                    </div>
            </div>
        </body>
    )
}
export default Infor;
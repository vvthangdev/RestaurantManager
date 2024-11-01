import React from 'react';
import styles from './contact.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPhone,faHouse, faEnvelope} from '@fortawesome/free-solid-svg-icons';


function Contact() {
    return (
       <body>
        <section className={styles.contact}>
            <div className={styles.content}>
                <h2>Contact Us</h2>
                <p>Hãy cho Quán nhậu Bách Khoa biết trải nghiệm của bạn nhé</p>
                
            </div>
            
            <div className={styles.container}>
                <div className={styles.contactinfo}>
                    <div className={styles.box}>
                        <div className={styles.icon}><FontAwesomeIcon icon={faHouse} /></div>
                        <div className={styles.text}>
                            <h3>Address</h3>
                            <p>Số 10 Tạ Quang Bửu</p>
                        </div>
                    </div>
                    <div className={styles.box}>
                        <div className={styles.icon}><FontAwesomeIcon icon={faEnvelope} /></div>
                        <div className={styles.text}>
                            <h3>Email</h3>
                            <p>quannhaubachkhoa@gmail.com</p>
                        </div>
                    </div>
                    <div className={styles.box}>
                        <div className={styles.icon}><FontAwesomeIcon icon={faPhone} /></div>
                        <div className={styles.text}>
                            <h3>Phone</h3>
                            <p>0123-456-789</p>
                        </div>
                    </div>
                </div>
            
            
                <div className={styles.contactform}>
                    <form>
                        <h2>Gửi tin nhắn</h2>
                        <div className={styles.inputbox}>
                            <input type="text" required="required" />
                            <span>Tên</span>
                        </div>
                        <div className={styles.inputbox}>
                            <input type="text" required="required"/>
                            <span>Email</span>
                        </div>
                        <div className={styles.inputbox}>
                            <textarea  required="required" ></textarea>
                            <span>Lời nhắn của bạn</span>
                        </div>
                        <div className={styles.inputbox}>
                            <input type="submit"name ='' value = 'Send'></input>
                            
                        </div>
                    </form>
                    </div>
                </div>
                </section>
                </body>
    );
}

export default Contact;

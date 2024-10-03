import { Link } from 'react-router-dom';
import { useForm } from 'hooks/useForm';
import { usePopup } from 'hooks/usePopup';
import { SlLocationPin } from "react-icons/sl";
import { BsTelephone } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import PopupMessage from 'components/layout/PopupMessage/PopupMessage';
import './Contacts.css';

const Contacts = () => {
    const { showPopup, message, triggerPopup } = usePopup();
    const { values, changeHandler, onSubmit } = useForm(
        { fullName: '', email: '', phone: '', message: '' },
        () => {
            triggerPopup('Your message has been successfully sent!');
        }
    );

    return (
        <section className="contact_section">
            {showPopup && (<PopupMessage message={message} />)}

            <section className="hero">
                <div className="path">
                    <Link to='/' className='homepage'>Home</Link> / Contacts
                </div>
                <h1>Contact Us</h1>
                <p>Need help? We're here for you!</p>
            </section>

            <div className="map-section">
                <div className="contact-details">
                    <div className="contact">
                        <SlLocationPin className='icon' />
                        <div className="info">
                            <p className='title'>Office address</p>
                            <p>6-ti Septemvri 17, Sofia Bulgaria</p>
                        </div>
                    </div>
                    <div className="contact">
                        <AiOutlineMail className='icon' />
                        <div className="info">
                            <p className='title'>Email address</p>
                            <p>homely@gmail.com</p>
                            <p>help-homely@gmail.com</p>
                        </div>
                    </div>
                    <div className="contact">
                        <BsTelephone className='icon' />
                        <div className="info">
                            <p className='title'>Phone number</p>
                            <p>+359 894 234 928</p>
                            <p>+359 897 645 540</p>
                        </div>
                    </div>
                </div>

                <iframe className="map"
                    src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=6-ti%20Septemvri%2017,%20Sofia+(Map)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                    frameBorder="0" allowFullScreen>
                </iframe>
            </div>

            <div className="contact-form-section">
                <h2>Reach Out to Us</h2>
                <p>We value your feedback. Please fill out the form below, and we will get back to you as soon as possible.</p>
                <form className="contact-form" onSubmit={onSubmit}>
                    <div className="input-fields">
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="Enter you name"
                                className="input-field"
                                name="fullName"
                                value={values.fullName}
                                onChange={changeHandler}
                                required
                            />
                            <input
                                type="email"
                                placeholder="Enter email address"
                                className="input-field"
                                name="email"
                                value={values.email}
                                onChange={changeHandler}
                                required
                            />
                            <input
                                type="tel"
                                placeholder="Phone"
                                className="input-field"
                                name="phone"
                                value={values.phone}
                                pattern="[0-9]{10}"
                                title="Please enter a 10-digit phone number"
                                onChange={changeHandler}
                            />
                        </div>

                        <textarea
                            name="message"
                            placeholder="Enter a message here..."
                            className="input-field"
                            value={values.message}
                            onChange={changeHandler}
                            cols="30"
                            rows="5"
                            required
                        />
                    </div>
                    <input type="submit" value="Send Message" className="button" />
                </form>
            </div>
        </section >
    );
};

export default Contacts;

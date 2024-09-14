import './Contacts.css';
import { useForm } from 'hooks/useForm';
import { usePopup } from 'hooks/usePopup';
import PopupMessage from 'components/PopupMessage/PopupMessage';

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
                <h1>Contact Us</h1>
                <p>Need help? We're here for you!</p>
            </section>
            <div className="contact_row">
                <iframe className="map"
                    src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=6-ti%20Septemvri%2017,%20Sofia+(Map)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                    frameBorder="0" allowFullScreen></iframe>

                <div className="form">
                    <div className="contacts_container">
                        <div className="contact">
                            <i className="fas fa-map"></i>
                            <h3>Address:</h3>
                            <p>6-ti Septemvri 17, Sofia</p>
                        </div>

                        <div className="contact">
                            <i className="fas fa-envelope"></i>
                            <h3>Email:</h3>
                            <p>homely@gmail.com</p>
                            <p>ask-homely@gmail.com</p>
                        </div>

                        <div className="contact">
                            <i className="fas fa-phone"></i>
                            <h3>Phone:</h3>
                            <p>+359 894 234 928</p>
                            <p>+359 883 234 234</p>
                        </div>
                    </div>

                    <form id="contact-form" onSubmit={onSubmit}>
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="box"
                            name="fullName"
                            value={values.fullName}
                            onChange={changeHandler}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="box"
                            name="email"
                            value={values.email}
                            onChange={changeHandler}
                            required
                        />
                        <input
                            type="tel"
                            placeholder="Phone"
                            className="box"
                            name="phone"
                            value={values.phone}
                            pattern="[0-9]{10}"
                            title="Please enter a 10-digit phone number"
                            onChange={changeHandler}
                            required
                        />
                        <textarea
                            name="message"
                            placeholder="Your Message"
                            className="box"
                            value={values.message}
                            onChange={changeHandler}
                            cols="30"
                            rows="5"
                            required
                        />
                        <input type="submit" value="Send Message" className="button" />
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contacts;

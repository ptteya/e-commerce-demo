import { useState } from 'react';
import './Contacts.css';

const Contacts = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        event.target.reset();
        setIsSubmitted(true);
    }

    return (
        <section className="contact_section">
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
                            <p> 6-ti Septemvri 17, Sofia</p>
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

                    <form id="contact-form" onSubmit={handleSubmit}>
                        <input type="text" placeholder="Full Name" className="box" name="fullName" required />
                        <input type="email" placeholder="Email" className="box" name="email" required />
                        <input type="tel" placeholder="Phone" className="box" name="phone" pattern="[0-9]{10}" title="Please enter a 10-digit phone number" required />
                        <textarea name="message" placeholder="Your Message" className="box" cols="30" rows="5" required ></textarea>
                        <input type="submit" value="Send Message" className="button" required />
                    </form>
                    {isSubmitted && <p className='thank-you-message'>Thank you for reaching out!</p>}
                </div>
            </div>
        </section>
    );
}

export default Contacts;
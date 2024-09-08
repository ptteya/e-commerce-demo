import './Contacts.css';

export const Contacts = () => {
    return (
        <section className="contact_section">
            <section className="hero">
                <h1>Contact Us</h1>
                <p>Discover our story, mission, and values.</p>
            </section>
            <div className="contact_row">
                <iframe className="map"
                    src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=6-ti%20Septemvri%2017,%20Sofia+(Map)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                    frameborder="0" allowfullscreen></iframe>

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

                    <form id="contact-form">
                        <input type="text" placeholder="Full Name" className="box" name="fullName" />
                        <input type="email" placeholder="Email" className="box" name="email" />
                        <input type="tel" placeholder="Phone" className="box" name="phone" />
                        <textarea name="message" placeholder="Your Message" className="box" cols="30" rows="5"></textarea>
                        <input type="submit" value="Send Message" className="button" />
                    </form>
                </div>
            </div>
        </section>
    );
}
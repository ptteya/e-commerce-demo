import './Footer.css';
import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <footer>
            <div className="subscribe">
                <div className="subscribe-info">
                    <h3>Home renovation ideas in your email</h3>
                    <p>Subscribe to our newsletter and be the first to know about new furniture and great deals</p>
                </div>
                <div className="subscribe-container">
                    <input type="text" placeholder="Enter your email address...." className="subscribe-input" />
                    <input type="submit" value="Subscribe" className="subscribe-btn" />
                    <p className="error-message"></p>
                </div>
            </div>

            <div className="footer-section">
                <div className="footer-content">
                    <div className="links-col">
                        <h3 className="col-title">Fast Links</h3>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/furniture/catalog/couches">Catalog</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/contacts">Contacts</Link></li>
                        </ul>
                    </div>

                    <div className="information-col">
                        <h3 className="col-title">Information</h3>
                        <div className="info">
                            <p>Free delivery in Sofia</p>
                            <p>Reliable supplier</p>
                            <p>Personal data protection policy</p>
                            <p>All prices include VAT</p>
                        </div>
                    </div>
                    <div className="contacts-col">
                        <h3 className="col-title">Contact us</h3>
                        <div className="contact-info">
                            <p> <i className="fas fa-map-marker-alt"></i>
                                6-ti Septemvri 17, Sofia</p>
                            <p> <i className="fas fa-phone-alt"></i>
                                +359 89 347 2637</p>
                            <p> <i className="fas fa-envelope"></i>
                                homely@gmail.com</p>
                        </div>
                    </div>

                    <div className="socials-col">
                        <h3 className="col-title">Follow Us</h3>
                        <div className="icons-row">
                            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
                            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
                            <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>
                        </div>
                    </div>
                </div>

                <div className="rights">
                    HOMELY Copyright © 2024 HOMELY - All rights reserved
                </div>
            </div>
        </footer>
    );
}
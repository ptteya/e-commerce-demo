import { Link } from 'react-router-dom';
import './404.css';

export const NotFound = () => {
    return (
        <div className="not-found">
            <div className="error-container">
                <h1>404</h1>
                <img src="/images/404.png" alt="broken chair" />
            </div>
            <div className="error-content">
                <h2>Page not found</h2>
                <p>Sorry, but the page that you requested doesn't exist.</p>
                <button><Link to="/">Back Home</Link></button>
            </div>
        </div>
    );
};
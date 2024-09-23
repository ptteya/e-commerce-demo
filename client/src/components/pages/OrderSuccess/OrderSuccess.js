import { Link } from "react-router-dom";
import './OrderSuccess.css';

const OrderSuccess = () => {
    return (
        <div className="success-container">
            <h2>Your purchase has been made! Thank you for buying form us! </h2>
            <p>We will contact you to confirm your order.</p>
            <Link to="/furniture?category=couches" className="btn-back">Back to Catalog</Link>
        </div>
    );
};

export default OrderSuccess;
import { REVIEWS } from "constants/homeConstants";
import { renderStars } from "utils/renderStars";
import './Reviews.css';

const Reviews = () => {
    return (
        <div className="reviews-section">
            <p className="reviews-title">Customer Reviews</p>
            <div className="reviews-box-container">
                {REVIEWS.map(review => (
                    <div className="review-box" key={review.customerName}>
                        <img src={review.img} alt="customer" />
                        <div className="review">
                            <p className="customer-name">{review.customerName}</p>
                            <div className="rating-container">
                                <div className="star-rating">
                                    {renderStars(review.rating)}
                                </div>
                                <p>{review.date}</p>
                            </div>
                            <p>{review.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reviews;
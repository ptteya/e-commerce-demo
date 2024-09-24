export const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    const stars = [];

    for (let i = 1; i <= fullStars; i++) {
        stars.push(<i key={`full-${i}`} className="fas fa-star"></i>);
    }

    if (halfStar) {
        stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }

    for (let i = 1; i <= emptyStars; i++) {
        stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
    }

    return stars;
};
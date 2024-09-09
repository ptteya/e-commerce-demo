import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import * as userService from '../../../services/userService';
import * as furnitureService from '../../../services/furnitureService';

export const CatalogItem = ({
    _id,
    name,
    price,
    size,
    images,
    rating
}) => {
    const { user, isAuthenticated, updateFavorites, updateGuestFavorites } = useContext(AuthContext);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if (user && user.favorites) {
            setLiked(user.favorites.includes(_id));
        } else {
            const localFavorites = furnitureService.getGuestFavorites();
            setLiked(localFavorites.includes(_id));
        }
    }, [user, isAuthenticated, _id]);

    const toggleLike = async () => {
        if (isAuthenticated) {
            try {
                const action = liked ? 'remove' : 'add';
                const result = await userService.updateFavorites(action, user._id, _id);
                setLiked(prevLiked => !prevLiked);
                updateFavorites(result.favorites);
            } catch (error) {
                console.error("Failed to update favorites:", error.message);
            }
        } else {
            let updatedFavorites = furnitureService.getGuestFavorites();

            if (liked) {
                updatedFavorites = updatedFavorites.filter(id => id !== _id);
            } else {
                updatedFavorites.push(_id);
            }

            localStorage.setItem('likedFurniture', JSON.stringify(updatedFavorites));
            updateGuestFavorites(updatedFavorites);
            setLiked(prevLiked => !prevLiked);
        }
    };

    const renderStars = () => {
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
    }

    return (
        <div className="product-card" id={_id}>
            <div className="image-container">
                <img src={images.mainImage} alt="couch" />
                <i className={`heart-icon ${liked ? 'fas fa-heart favorites' : 'far fa-heart'}`} onClick={toggleLike}></i>
            </div>
            <div className="product-info">
                <div className="left-side">
                    <h3>{name}</h3>
                    <p className="size">{size.width} x {size.height} x {size.length} cm</p>
                    <p className="price">${price}</p>

                </div>
                <div className="star-rating">
                    {renderStars()}
                </div>
            </div>
        </div>
    );
}
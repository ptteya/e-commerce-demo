import { useContext, useState, useEffect } from "react";
import './Favorites.css';
import CatalogItem from "components/Catalog/CatalogItem";
import { AuthContext } from "contexts/AuthContext";
import * as furnitureService from 'services/furnitureService';

const Favorites = () => {
    const { user, isAuthenticated, guestFavorites } = useContext(AuthContext);
    const [furniture, setFurniture] = useState([]);

    useEffect(() => {
        const fetchLikedFurniture = async () => {
            const likedFurniture = await furnitureService.getCollectionItems('favorites', user, isAuthenticated);
            setFurniture(likedFurniture);
        };

        fetchLikedFurniture();
    }, [user, isAuthenticated, guestFavorites]);

    return (
        <div className="favorites-container">
            <h1>Favorite Products</h1>
            <div className="product-container">
                {furniture.length > 0 ? (
                    <div className="product-cards">
                        {furniture.map((f) => <CatalogItem key={f._id} {...f} />)}
                    </div>
                ) : (
                    <p className="no-content">You don't have any favorite products!</p>
                )}
            </div>
        </div>
    );
}

export default Favorites;
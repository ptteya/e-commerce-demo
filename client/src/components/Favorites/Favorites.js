import { useContext, useState, useEffect } from "react";
import { CatalogItem } from "../Catalog/CatalogItem/CatalogItem";
import { AuthContext } from "../../contexts/AuthContext";
import './Favorites.css';
import * as furnitureService from '../../services/furnitureService';

export const Favorites = () => {
    const { user, isAuthenticated, guestFavorites } = useContext(AuthContext);
    const [furniture, setFurniture] = useState([]);

    useEffect(() => {
        const fetchLikedFurniture = async () => {
            const likedFurniture = await furnitureService.getFavoriteItems(user, isAuthenticated);
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
import './Favorites.css';
import { useContext, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { AuthContext } from "contexts/AuthContext";
import { CollectionContext } from 'contexts/CollectionContext';
import CatalogItem from 'components/pages/Catalog/CatalogItem/CatalogItem';
import * as furnitureService from 'services/furnitureService';

const Favorites = () => {
    const { user, isAuthenticated } = useContext(AuthContext);
    const { guestFavorites } = useContext(CollectionContext);
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
                    <>
                        {!isAuthenticated && <p className='message'>You don't want to loose your liked products? <Link to={'/users/login'}>Log in</Link></p>}
                        <div className="product-cards">
                            {furniture.map((f) => <CatalogItem key={f._id} {...f} />)}
                        </div>
                    </>
                ) : (
                    <p className="message">You don't have any favorite products!</p>
                )}
            </div>
        </div>
    );
};

export default Favorites;
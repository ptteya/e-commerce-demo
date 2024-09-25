import { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import * as userService from 'services/userService';
import * as furnitureService from 'services/furnitureService';

export const CollectionContext = createContext();

export const CollectionProvider = ({ children }) => {
    const { user, setUser } = useContext(AuthContext);
    const [guestCart, setGuestCart] = useState([]);
    const [guestFavorites, setGuestFavorites] = useState([]);

    useEffect(() => {
        if (!user?.token) {
            loadGuestCollections();
        }
    }, [user]);

    const loadGuestCollections = () => {
        setGuestFavorites(furnitureService.getLocalCollection('favorites'));
        setGuestCart(furnitureService.getLocalCollection('cart'));
    };

    const updateUserCollection = (collectionName, newItems) => {
        setUser(state => ({
            ...state,
            [collectionName]: newItems
        }));
    };

    const updateGuestCollection = (collectionName, updatedCollection) => {
        if (updatedCollection.length === 0) {
            localStorage.removeItem(collectionName);
        } else {
            localStorage.setItem(collectionName, JSON.stringify(updatedCollection));
        }

        if (collectionName === 'cart') {
            setGuestCart(updatedCollection);
        } else if (collectionName === 'favorites') {
            setGuestFavorites(updatedCollection);
        }
    };

    const emptyCollection = async (collectionName) => {
        if (user.token) {
            try {
                await userService.clearCollection(user._id, collectionName);
                updateUserCollection(collectionName, []);
            } catch (error) {
                console.error(error);
            }
        } else {
            updateGuestCollection(collectionName, []);
        }
    };

    const context = {
        guestCart,
        guestFavorites,
        updateGuestCollection,
        updateUserCollection,
        emptyCollection,
    };

    return (
        <CollectionContext.Provider value={context}>
            {children}
        </CollectionContext.Provider>
    );
};

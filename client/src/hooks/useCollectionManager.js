import { AuthContext } from "contexts/AuthContext";
import { CollectionContext } from "contexts/CollectionContext";
import { useContext, useEffect, useState } from "react";
import * as userService from 'services/userService';
import * as collectionService from 'services/collectionService';

export const useCollectionManager = (furnitureId, collectionName) => {
    const { user, isAuthenticated } = useContext(AuthContext);
    const { updateGuestCollection, updateUserCollection } = useContext(CollectionContext);
    const [added, setAdded] = useState(false);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const loadInitialState = () => {
            const collection = isAuthenticated
                ? user[collectionName]
                : collectionService.getLocalCollection(collectionName);

            const item = collection.find((el) => el.furnitureId === furnitureId);

            if (item) {
                setQuantity(item.quantity || 1);
                setAdded(true);
            }
        }
        loadInitialState();
    }, [furnitureId, user, isAuthenticated, collectionName]);

    const modifyUserCollection = async (action, newQuantity = 1) => {
        try {
            const result = await userService.updateCollection(action, collectionName, user._id, furnitureId, newQuantity);
            updateUserCollection(collectionName, result[collectionName]);
        } catch (error) {
            console.error(`Failed to update ${collectionName}:`, error.message);
        }
    };

    const toggleCollectionItem = async () => {
        const action = added ? 'remove' : 'add';

        if (isAuthenticated) {
            await modifyUserCollection(action);
        } else {
            const updatedCollection = collectionService.toggleGuestCollection(furnitureId, collectionName, action);
            updateGuestCollection(collectionName, updatedCollection);
        }

        setAdded(prevState => !prevState);
    };

    const updateItemQuantity = async (newQuantity) => {
        if (isAuthenticated) {
            await modifyUserCollection('update', newQuantity)
        } else {
            const updatedCollection = collectionService.updateGuestQuantity(furnitureId, collectionName, newQuantity);
            updateGuestCollection('cart', updatedCollection);
        }
        setQuantity(newQuantity);
    };

    return {
        added,
        toggleCollectionItem,
        updateItemQuantity,
        quantity,
    };
};
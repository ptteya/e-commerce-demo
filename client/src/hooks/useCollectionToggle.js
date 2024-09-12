import { AuthContext } from "contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import * as furnitureService from 'services/furnitureService';
import * as userService from 'services/userService';

export const useCollectionToggle = (id, collectionName) => {
    const { user, isAuthenticated, updateCollection, updateLocalCollection } = useContext(AuthContext);
    const [added, setAdded] = useState(false);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const loadInitialState = () => {
            const collection = isAuthenticated
                ? user[collectionName]
                : furnitureService.getLocalCollection(collectionName);

            const item = furnitureService.getItemFromCollection(collection, id);

            if (item) {
                if (collectionName === 'cart') {
                    setQuantity(item.quantity);
                }
                setAdded(!!item);
            }
        }
        loadInitialState();
    }, [id, user, isAuthenticated, collectionName]);


    const handleToggle = async (newQuantity = 1, update = false) => {
        if (isAuthenticated) {
            let action = added
                ? (update ? 'update' : 'remove')
                : 'add';
            await userService.handleAuthToggle(action, collectionName, user._id, id, newQuantity, updateCollection);
        } else {
            furnitureService.handleLocalToggle(id, added, collectionName, newQuantity, update, updateLocalCollection);
        }

        handleState(collectionName, newQuantity, update);
    }

    function handleState(collectionName, quantity, update) {
        if (update && collectionName === 'cart') {
            setQuantity(quantity);
        } else {
            setAdded(prevState => !prevState);
        }
    }

    return {
        added,
        handleToggle,
        quantity,
    }
}




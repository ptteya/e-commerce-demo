import { AuthContext } from "contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
const furnitureService = require('services/furnitureService');
const userService = require('services/userService');

const useToggle = (id, collectionName) => {
    const { user, isAuthenticated, updateCollection, updateLocalCollection } = useContext(AuthContext);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        const collection = user[collectionName];
        if (user && isAuthenticated) {
            setAdded(collection.includes(id));
        } else {
            const localCollection = furnitureService.getLocalCollection(collectionName);
            setAdded(localCollection.includes(id));
        }
    }, [id, user, isAuthenticated, collectionName]);


    const handleToggle = async () => {
        if (isAuthenticated) {
            try {
                const action = added ? 'remove' : 'add';
                const result = await userService.updateCollection(action, collectionName, user._id, id);
                setAdded(prevState => !prevState);
                updateCollection(collectionName, result[collectionName]);
            } catch (error) {
                console.error(`Failed to update ${collectionName}:`, error.message);
            }
        } else {
            let updatedCollection = furnitureService.getLocalCollection(collectionName);

            if (added) {
                updatedCollection = updatedCollection.filter(currId => currId !== id);
            } else {
                updatedCollection.push(id);
            }

            updateLocalCollection(collectionName, updatedCollection);
            setAdded(prevState => !prevState);
        }
    }

    return {
        added,
        handleToggle
    }
}

export default useToggle;
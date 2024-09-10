import { useEffect, useState } from "react";
import * as furnitureService from 'services/furnitureService';

export const useFurniture = (category = null) => {
    const [furniture, setFurniture] = useState([]);

    useEffect(() => {
        async function fetchData() {
            let result = [];
            try {
                if (category) {
                    result = await furnitureService.getByCategory(category);
                } else {
                    result = await furnitureService.getAll();
                }
                setFurniture(result.furniture);
            } catch (error) {
                console.log('Error fetching furniture:', error.message);
            }
        }

        fetchData();
    }, [category]);

    return {
        furniture
    }
};
import { useEffect, useState } from "react";
import * as furnitureService from 'services/furnitureService';

export const useFurniture = (queryString) => {
    const [furniture, setFurniture] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await furnitureService.getFurniture(queryString);
                setFurniture(result.furniture);
            } catch (error) {
                console.error('Error fetching furniture:', error.message);
            }
        }

        fetchData();
    }, [queryString]);

    return furniture;
};
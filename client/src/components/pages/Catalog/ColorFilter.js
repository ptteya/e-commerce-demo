import { memo, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQueryHandler } from "hooks/useQueryHandler";

const colors = ["white", "gray", "black", "brown", "beige", "green", "yellow", "pink", "blue", "purple", "red"];

const ColorFilter = () => {
    const [searchParams] = useSearchParams();
    const { handleFilter } = useQueryHandler();
    const [selectedColor, setSelectedColor] = useState(null);

    useEffect(() => {
        const color = searchParams.get('color');
        setSelectedColor(color || null);
    }, [searchParams]);

    const handleColorClick = (color) => {
        setSelectedColor(color);
        handleFilter({ color });
    };

    return (
        <div className="filter-category">
            <p className="filter-title">COLOR</p>
            <div className="filter-content">
                <div className="colors-container">
                    {colors.map((color) => (
                        <div
                            key={color}
                            className={`color-box ${selectedColor === color ? 'selected' : ''}`}
                            id={color}
                            onClick={() => handleColorClick(color)}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default memo(ColorFilter);
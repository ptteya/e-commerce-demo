import { useQueryHandler } from "hooks/useQueryHandler";
import { useState } from "react";

const colors = ["white", "gray", "black", "brown", "beige", "green", "yellow", "pink", "blue", "purple", "red"];

const ColorFilter = () => {
    const { handleFilter } = useQueryHandler();
    const [selectedColor, setSelectedColor] = useState(null);

    const handleColorClick = (color) => {
        setSelectedColor(color);
        handleFilter({ color });
    };

    return (
        <div className="filter-category">
            <p className="filter-title">Color <i className="fas fa-regular fa-chevron-up arrow arrow-icon"></i>
            </p>
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

export default ColorFilter;
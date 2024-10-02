import { memo, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useQueryHandler } from "hooks/useQueryHandler";

const colors = ["white", "gray", "black", "brown", "beige", "green", "yellow", "pink", "blue", "purple", "red"];

const ColorFilter = () => {
    const [searchParams] = useSearchParams();
    const { handleFilter, resetSearchParams } = useQueryHandler();

    const selectedColor = useMemo(() => searchParams.get('color'), [searchParams]);

    const handleColorClick = (color) => {
        if (selectedColor === color) {
            resetSearchParams(['color']);
        } else {
            handleFilter({ color });
        }
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
                        >
                            <i className="fas fa-check"></i>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default memo(ColorFilter);
import { memo } from "react";
import { categoryOptions } from "constants/categoryOptions";
import { useQueryHandler } from "hooks/useQueryHandler";
import { formatCategoryTitle } from "utils/formatCategoryTitle";

const CategoryFilter = () => {
    const { handleFilter } = useQueryHandler();

    return (
        <div className="filter-category">
            <p className="filter-title">CATEGORY</p>
            <ul >
                {categoryOptions.map(option => (
                    <li key={option} onClick={() => handleFilter({ category: option })}>
                        {formatCategoryTitle(option)}
                    </li>
                ))}
                <li onClick={() => handleFilter({ category: '' })}>All Items</li>
            </ul>
        </div >
    );
};

export default memo(CategoryFilter);
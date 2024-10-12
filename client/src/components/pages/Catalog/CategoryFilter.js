import { Link } from "react-router-dom";
import { memo } from "react";
import { categoryOptions } from "constants/categoryOptions";
import { formatCategoryTitle } from "utils/formatCategoryTitle";

const CategoryFilter = () => {
    return (
        <div className="filter-category">
            <p className="filter-title">CATEGORY</p>
            <ul className="filter-content">
                {categoryOptions.map(option => (
                    <li key={option}>
                        <Link to={`/furniture?category=${option}`}>
                            {formatCategoryTitle(option)}
                        </Link>
                    </li>
                ))}
                <li>
                    <Link to={`/furniture`}>
                        All items
                    </Link>
                </li>
            </ul>
        </div >
    );
};

export default memo(CategoryFilter);
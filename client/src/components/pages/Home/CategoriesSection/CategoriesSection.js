import { CATEGORIES } from "constants/homeConstants";
import { useNavigate } from "react-router-dom";
import './CategoriesSection.css';

const CategoriesSection = () => {
    const navigate = useNavigate();

    return (
        <div className="categories">
            {CATEGORIES.map((category) => (
                <div
                    key={category.name}
                    className={`grid-item ${category.name.toLowerCase()}`}
                    onClick={() => navigate(`/furniture?category=${category.name.toLocaleLowerCase()}`)}
                >
                    <img src={`/images/categories/${category.img}`} alt="category" />
                    <div className="description">
                        <h2>{category.name}</h2>
                        <p>Shop Now</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CategoriesSection;
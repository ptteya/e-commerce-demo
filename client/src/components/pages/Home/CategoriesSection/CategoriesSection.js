import { CATEGORIES } from "constants/homeConstants";
import { Link } from "react-router-dom";
import './CategoriesSection.css';

const CategoriesSection = () => {
    return (
        <div className="categories">
            <div className="category-title">
                <p>Our Categories</p>
            </div>
            <div className="items">
                {CATEGORIES.map((category) => (
                    <div className="item" key={category.name}>
                        <Link to={`/furniture?category=${category.name.toLocaleLowerCase()}`}>
                            <img src={`images/${category.img}`} alt={category.name} />
                            <i className="fas fa-arrow-right"></i>
                        </Link>
                        <p className="category-name">{category.name}</p>
                        <p>Find the best {category.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoriesSection;
import { useForm } from 'hooks/useForm';
import { useQueryHandler } from 'hooks/useQueryHandler';

const PriceFilter = () => {
    const { handleFilter } = useQueryHandler();
    const { values, changeHandler, onSubmit } = useForm({
        minPrice: 100,
        maxPrice: 900,
    }, handleFilter);

    return (
        <>
            <h2 className="filter-title" htmlFor="price-range">Price Range <i
                className="fas fa-regular fa-chevron-up arrow arrow-icon"></i></h2>
            <div className="filter-content">
                <form className="price-inputs" onSubmit={onSubmit}>
                    <input
                        type="number"
                        name="minPrice"
                        min="0"
                        max="3000"
                        value={values.minPrice}
                        onChange={changeHandler}
                    />
                    <span className="range-symbol">-</span>
                    <input
                        type="number"
                        name="maxPrice"
                        min="0"
                        max="3000"
                        value={values.maxPrice}
                        onChange={changeHandler}
                    />
                    <button className="price-range-search-btn" type="submit">Filter</button>
                </form>
            </div>
        </>

    );
}

export default PriceFilter;
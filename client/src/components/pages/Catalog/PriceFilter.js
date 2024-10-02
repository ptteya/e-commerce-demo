import { memo, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'hooks/useForm';
import { useQueryHandler } from 'hooks/useQueryHandler';

const PriceFilter = () => {
    const [searchParams] = useSearchParams();
    const { handleFilter } = useQueryHandler();

    const initialValues = useMemo(() => {
        const getPriceParams = (paramName, defaultValue) => {
            const paramValue = searchParams.get(paramName, defaultValue);
            return paramValue !== null ? paramValue : defaultValue;
        };

        return {
            minPrice: getPriceParams('minPrice', 0),
            maxPrice: getPriceParams('maxPrice', 3000)
        };
    }, [searchParams]);

    const { values, changeHandler, setValues, onSubmit } = useForm(initialValues, handleFilter);

    useEffect(() => {
        setValues(initialValues);
    }, [searchParams, setValues, initialValues]);

    return (
        <div className="filter-category">
            <p className="filter-title" htmlFor="price-range">PRICE RANGE</p>
            <div className="filter-content">
                <form className="price-inputs" onSubmit={(e) => onSubmit(e, false)}>
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
                        min="1"
                        max="3000"
                        value={values.maxPrice}
                        onChange={changeHandler}
                    />
                    <button className="price-filter-btn" type="submit"></button>
                </form>
            </div>
        </div>
    );
};

export default memo(PriceFilter);
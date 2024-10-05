import { memo, useEffect, useMemo } from 'react';
import { useForm } from 'hooks/useForm';
import { useQueryHandler } from 'hooks/useQueryHandler';

const DEFAULT_MIN_PRICE = 0;

const PriceFilter = ({ maxPrice }) => {
    const { searchParams, handleFilter, resetSearchParams } = useQueryHandler();

    const minPriceFromParams = searchParams.get('minPrice');
    const maxPriceFromParams = searchParams.get('maxPrice');

    const initialValues = useMemo(() => ({
        minPrice: minPriceFromParams || DEFAULT_MIN_PRICE,
        maxPrice: maxPriceFromParams || maxPrice,
    }), [minPriceFromParams, maxPriceFromParams, maxPrice]);

    const { values, changeHandler, setValues, onSubmit } = useForm(initialValues, handleFilter);

    useEffect(() => {
        setValues(initialValues);
    }, [setValues, initialValues]);

    const isPriceFilterApplied = !!(minPriceFromParams || maxPriceFromParams);

    return (
        <div className="filter-category">
            <p className="filter-title" htmlFor="price-range">PRICE RANGE</p>
            <div className="filter-content">
                {isPriceFilterApplied && (
                    <div className='reset-price'>
                        <p className='applied-price'>
                            Price: <span className='range'>${minPriceFromParams} - ${maxPriceFromParams}</span>
                        </p>
                        <i
                            className="far fa-times-circle x-mark"
                            onClick={() => resetSearchParams(['minPrice', 'maxPrice'])}
                        ></i>
                    </div>
                )}
                <form className="price-inputs" onSubmit={(e) => onSubmit(e, false)}>
                    <input
                        type="number"
                        name="minPrice"
                        min='0'
                        value={values.minPrice}
                        onChange={changeHandler}
                    />
                    <span className="range-symbol">-</span>
                    <input
                        type="number"
                        name="maxPrice"
                        min='0'
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
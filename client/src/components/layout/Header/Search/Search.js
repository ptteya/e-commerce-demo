import { useForm } from 'hooks/useForm';
import { useQueryHandler } from 'hooks/useQueryHandler';
import './Search.css';

const Search = () => {
    const { handleSearch } = useQueryHandler();
    const { values, changeHandler, onSubmit } = useForm({ searchQuery: '' }, handleSearch);

    return (
        <form className="search-form" onSubmit={onSubmit}>
            <input
                id="search-input"
                type="text"
                name="searchQuery"
                value={values.searchQuery}
                onChange={changeHandler}
                placeholder="Search here..."
            />
            <button type="submit" id="search-btn"><i className="fas fa-search search-icon"></i></button>
        </form>
    );
};

export default Search;
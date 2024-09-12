import { useForm } from 'hooks/useForm';
import { useQueryHandler } from 'hooks/useQueryHandler';

const Search = () => {
    const { handleSearch } = useQueryHandler();
    const { values, changeHandler, onSubmit, resetForm } = useForm({ searchQuery: '' }, handleSearch);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch({ searchQuery: e.target.value });
            resetForm();
        }
    }

    return (
        <div className="search-bar">
            <form id="search-form" onSubmit={onSubmit}>
                <input
                    id="search-input"
                    type="text"
                    name="searchQuery"
                    value={values.searchQuery}
                    onChange={changeHandler}
                    onKeyDown={handleKeyPress}
                    placeholder="Search here..."
                />
                <button type="submit" id="search-btn"><i className="fas fa-search search-icon"></i></button>
            </form>
        </div>
    );
}

export default Search;
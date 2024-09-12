import { useForm } from 'hooks/useForm';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const { values, changeHandler, onSubmit } = useForm({ query: '' }, handleSearch);
    const navigate = useNavigate();

    async function handleSearch(values) {
        const { query } = values;
        navigate({
            pathname: '/furniture/catalog',
            search: `?searchQuery=${encodeURIComponent(query)}`
        });
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch({ query: e.target.value })
        }
    }

    return (
        <div className="search-bar">
            <form id="search-form" onSubmit={onSubmit}>
                <input
                    id="search-input"
                    type="text"
                    name="query"
                    value={values.query}
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
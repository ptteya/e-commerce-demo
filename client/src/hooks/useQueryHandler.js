import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export const useQueryHandler = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSearch = (values) => {
        const { searchQuery } = values;
        navigate(`/furniture?searchQuery=${encodeURIComponent(searchQuery)}`);
    };

    const handleFilter = (values) => {
        const updatedParams = new URLSearchParams(searchParams);
        Object.entries(values).forEach(([key, value]) => updatedParams.set(key, value));
        setSearchParams(updatedParams);

        navigate({
            pathname: location.pathname,
            search: `?${updatedParams}`
        });
    };

    const resetSearchParams = (paramsList) => {
        paramsList.forEach(p => searchParams.delete(p));
        setSearchParams(searchParams);
    };

    return { handleSearch, handleFilter, resetSearchParams };
};


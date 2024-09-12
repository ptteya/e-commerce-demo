import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export const useQueryHandler = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSearch = (values) => {
        const { searchQuery } = values;
        navigate(`/furniture/catalog?searchQuery=${encodeURIComponent(searchQuery)}`);
    }

    function handleFilter(values) {
        const updatedParams = new URLSearchParams(searchParams);
        Object.entries(values).forEach(([key, value]) => updatedParams.set(key, value));
        setSearchParams(updatedParams);

        navigate({
            pathname: location.pathname,
            search: `?${updatedParams}`
        });
    }

    return { handleSearch, handleFilter };
}


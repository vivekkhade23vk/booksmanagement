import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../redux/actions';
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchBar = () => {
    const dispatch = useDispatch();

    const handleSearch = (e) => {
        dispatch(setSearchTerm(e.target.value));
    };

    return (
        <div className="container mt-5">
            <input
                type="text"
                className="form-control"
                placeholder="Search by title or author..."
                onChange={handleSearch}
            />
        </div>
    );
};

export default SearchBar;

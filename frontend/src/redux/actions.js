import axios from 'axios';

let API='http://localhost:8080'

export const fetchBooks = (page = 1, limit = 10, filters = {}) => async dispatch => {
    const response = await axios.get(`${API}/books?page=${page}&limit=${limit}`, { params: filters });
    dispatch({ type: 'FETCH_BOOKS', payload: response.data });
};

export const addBook = (bookData) => async dispatch => {
    const response = await axios.post(`${API}/books`, bookData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    dispatch({ type: 'ADD_BOOK', payload: response.data });
};

export const updateBook = (id, bookData) => async dispatch => {
    const response = await axios.put(`${API}/books/${id}`, bookData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    dispatch({ type: 'UPDATE_BOOK', payload: response.data });
};

export const deleteBook = (id) => async dispatch => {
    await axios.delete(`${API}/books/${id}`);
    dispatch({ type: 'DELETE_BOOK', payload: id });
};

export const setSearchTerm = (term) => {
    return { type: 'SET_SEARCH_TERM', payload: term };
};

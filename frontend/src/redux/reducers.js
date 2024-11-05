const initialState = {
    books: [],
    totalPages: 0,
    currentPage: 1,
    searchTerm: '',
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_BOOKS':
            return { ...state, ...action.payload };
        case 'ADD_BOOK':
            return { ...state, books: [...state.books, action.payload] };
        case 'UPDATE_BOOK':
            return {
                ...state,
                books: state.books.map(book => book._id === action.payload._id ? action.payload : book),
            };
        case 'DELETE_BOOK':
            return {
                ...state,
                books: state.books.filter(book => book._id !== action.payload),
            };
        case 'SET_SEARCH_TERM':
            return { ...state, searchTerm: action.payload };
        default:
            return state;
    }
};

export default rootReducer;

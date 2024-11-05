import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, deleteBook } from '../redux/actions';

const BookList = () => {
    const dispatch = useDispatch();
    const { books, totalPages, currentPage, searchTerm } = useSelector(state => state);
    const [page, setPage] = useState(currentPage);

    useEffect(() => {
        dispatch(fetchBooks(page));
    }, [dispatch, page]);

    const handleDelete = (id) => {
        dispatch(deleteBook(id));
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Book List</h2>
            <ul className="list-group">
                {filteredBooks.map(book => (
                    <li key={book._id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <h5>{book.title}</h5>
                            <img src={`/${book.coverImage}`} alt={book.title} style={{ width: '100px', height: 'auto' }} className="me-3" />
                            <p><strong>Author:</strong> {book.author}</p>
                            <p><strong>Genre:</strong> {book.genre}</p>
                            <p><strong>Publication Date:</strong> {new Date(book.publicationDate).toLocaleDateString()}</p>
                        </div>
                        <button className="btn btn-danger" onClick={() => handleDelete(book._id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <nav className="mt-4">
                <ul className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <li className={`page-item ${index + 1 === page ? 'active' : ''}`} key={index + 1}>
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(index + 1)}
                                disabled={index + 1 === page}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default BookList;

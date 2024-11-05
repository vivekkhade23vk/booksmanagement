import React from 'react';

const BookDetail = ({ book }) => {
    return (
        <div className="book-detail card" style={{ width: '18rem' }}>
            <img
                src={book.coverImage}
                alt={`${book.title} cover`}
                className="card-img-top"
                style={{ height: '250px', objectFit: 'cover' }}
            />
            <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text"><strong>Author:</strong> {book.author}</p>
                <p className="card-text"><strong>Genre:</strong> {book.genre}</p>
                <p className="card-text"><strong>Publication Date:</strong> {new Date(book.publicationDate).toLocaleDateString()}</p>
            </div>
        </div>
    );
};

export default BookDetail;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook, updateBook } from '../redux/actions';

const BookForm = ({ book }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        title: book ? book.title : '',
        author: book ? book.author : '',
        genre: book ? book.genre : '',
        publicationDate: book ? book.publicationDate : '',
        coverImage: null,
    });

    const handleChange = (e) => {
        if (e.target.name === 'coverImage') {
            setFormData({ ...formData, coverImage: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(); 
        data.append('title', formData.title);
        data.append('author', formData.author);
        data.append('genre', formData.genre);
        data.append('publicationDate', formData.publicationDate);
        data.append('coverImage', formData.coverImage);
    
        if (book) {
            dispatch(updateBook(book._id, data));
        } else {
            dispatch(addBook(data)); 
        }
        setFormData({ title: '', author: '', genre: '', publicationDate: '', coverImage: null }); 
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">{book ? 'Update Book' : 'Add Book'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        id="title"
                        placeholder="Enter book title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="author" className="form-label">Author</label>
                    <input
                        type="text"
                        className="form-control"
                        name="author"
                        id="author"
                        placeholder="Enter author name"
                        value={formData.author}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="genre" className="form-label">Genre</label>
                    <input
                        type="text"
                        className="form-control"
                        name="genre"
                        id="genre"
                        placeholder="Enter genre"
                        value={formData.genre}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="publicationDate" className="form-label">Publication Date</label>
                    <input
                        type="date"
                        className="form-control"
                        name="publicationDate"
                        id="publicationDate"
                        value={formData.publicationDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="coverImage" className="form-label">Cover Image</label>
                    <input
                        type="file"
                        className="form-control"
                        name="coverImage"
                        id="coverImage"
                        onChange={handleChange}
                        accept="image/*"
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    {book ? 'Update Book' : 'Add Book'}
                </button>
            </form>
        </div>
    );
};

export default BookForm;

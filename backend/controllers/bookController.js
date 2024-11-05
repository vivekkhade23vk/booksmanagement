const Book = require('../models/Book');
const path = require('path');


// Get all books
exports.getBooks = async (req, res) => {
    const { page = 1, limit = 10, title, author, genre } = req.query;

    const query = {};
    if (title) query.title = { $regex: title, $options: 'i' };
    if (author) query.author = { $regex: author, $options: 'i' };
    if (genre) query.genre = genre;

    try {
        const books = await Book.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit);
        const count = await Book.countDocuments(query);
        res.json({
            books,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add a new book
exports.addBook = async (req, res) => {
    const { title, author, genre, publicationDate } = req.body;
    const coverImage = req.file.path; 

    const newBook = new Book({
        title,
        author,
        genre,
        publicationDate,
        coverImage,
    });

    try {
        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update book details
exports.updateBook = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.file ? { ...req.body, coverImage: req.file.path } : req.body;

    try {
        const updatedBook = await Book.findByIdAndUpdate(id, updatedData, { new: true });
        res.json(updatedBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a book
exports.deleteBook = async (req, res) => {
    const { id } = req.params;

    try {
        await Book.findByIdAndDelete(id);
        res.status(204).json();
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
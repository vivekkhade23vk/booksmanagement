const express = require('express');
const bookRoutes = express.Router();
const bookController = require('../controllers/bookController');
const { body, validationResult } = require('express-validator');
const multer = require('multer');

const validateBook = [
    body('title').notEmpty().withMessage('Title is required'),
    body('author').notEmpty().withMessage('Author is required'),
];
const upload = multer({ dest: 'uploads/' });

bookRoutes.get('/', bookController.getBooks);
bookRoutes.post('/', upload.single('cover'), validateBook, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    await bookController.addBook(req, res);
});
bookRoutes.put('/:id', bookController.updateBook);
bookRoutes.delete('/:id', bookController.deleteBook);

module.exports = bookRoutes;

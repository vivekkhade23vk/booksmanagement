const errorHandler = (err, req, res, next) => {
    console.error(err.stack); 

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; 
    res.status(statusCode);

    res.json({ message: err.message || 'An unknown error occurred'    });
};

module.exports = errorHandler;

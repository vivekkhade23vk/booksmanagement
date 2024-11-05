import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/searchBar';
import BookForm from './components/BookForm';
import BookList from './components/BookList';

const App = () => {
    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => {
        setShowForm(!showForm);
    };
    return (
        <div className="app">
            <h1>Book Management System</h1>
            <SearchBar />
            <button className="btn btn-primary" onClick={toggleForm}>
                    {showForm ? 'Hide Form' : 'Add New Book'}
                </button>
                <div  className={`accordion-collapse collapse ${showForm ? 'show' : ''}`}>
                <BookForm />
                </div>
           
            <BookList />
        </div>
    );
};

export default App;

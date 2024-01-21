import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

function SearchPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [currentlyReading, setCurrentlyReading] = useState([]);
    const [wantToRead, setWantToRead] = useState([]);
    const [read, setRead] = useState([]);

    useEffect(() => {
        // Fetch books for the main shelves
        BooksAPI.getAll().then((books) => {
            const currentlyReadingBooks = books.filter(
                (book) => book.shelf === "currentlyReading"
            );
            const wantToReadBooks = books.filter((book) => book.shelf === "wantToRead");
            const readBooks = books.filter((book) => book.shelf === "read");

            setCurrentlyReading(currentlyReadingBooks);
            setWantToRead(wantToReadBooks);
            setRead(readBooks);
        });
    }, []);

    const handleSearch = async () => {
        try {
            const results = await BooksAPI.search(searchQuery, 20);
            if (results.error) {
                setSearchResults([]);
            } else {
                setSearchResults(results);
            }
        } catch (error) {
            console.error("Error fetching search results:", error);
            setSearchResults([]);
        }
    };

    const handleShelfChange = (book, shelf) => {
        BooksAPI.update(book, shelf).then(() => {
            // Fetch the updated list of books after the shelf change
            BooksAPI.getAll().then((books) => {
                const currentlyReadingBooks = books.filter(
                    (b) => b.shelf === "currentlyReading"
                );
                const wantToReadBooks = books.filter((b) => b.shelf === "wantToRead");
                const readBooks = books.filter((b) => b.shelf === "read");

                setCurrentlyReading(currentlyReadingBooks);
                setWantToRead(wantToReadBooks);
                setRead(readBooks);
            });
        });
    };

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link to="/" className="close-search">
                    Close
                </Link>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title or author"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {searchResults.map((book) => (
                        <li key={book.id}>
                            <div className="book">
                                <div className="book-top">
                                    <div
                                        className="book-cover"
                                        style={{
                                            width: 128,
                                            height: 193,
                                            backgroundImage: `url("${book.imageLinks.thumbnail}")`,
                                        }}
                                    ></div>
                                    <div className="book-shelf-changer">
                                        <select
                                            value={book.shelf || "none"}
                                            onChange={(e) => handleShelfChange(book, e.target.value)}
                                        >
                                            <option value="move" disabled>
                                                Move to...
                                            </option>
                                            <option value="currentlyReading">Currently Reading</option>
                                            <option value="wantToRead">Want to Read</option>
                                            <option value="read">Read</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">
                                    {book.authors ? book.authors.join(", ") : "Unknown Author"}
                                </div>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}

export default SearchPage;

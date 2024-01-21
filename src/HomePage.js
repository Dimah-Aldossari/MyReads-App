import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI"; // Import your BooksAPI or relevant functions

function HomePage() {
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

    const handleShelfChange = (book, shelf) => {
        // Update the shelf of the selected book
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
        <div className="list-books">
            <div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {currentlyReading.map((book) => (
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
                                                    value="currentlyReading"
                                                    onChange={(e) =>
                                                        handleShelfChange(book, e.target.value)
                                                    }
                                                >
                                                    <option value="none" disabled>
                                                        Move to...
                                                    </option>
                                                    <option value="currentlyReading">
                                                        Currently Reading
                                                    </option>
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
                <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {wantToRead.map((book) => (
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
                                                    value="wantToRead"
                                                    onChange={(e) =>
                                                        handleShelfChange(book, e.target.value)
                                                    }
                                                >
                                                    <option value="none" disabled>
                                                        Move to...
                                                    </option>
                                                    <option value="currentlyReading">
                                                        Currently Reading
                                                    </option>
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
                <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {read.map((book) => (
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
                                                    value="read"
                                                    onChange={(e) => handleShelfChange(book, e.target.value)}
                                                >
                                                    <option value="none" disabled>
                                                        Move to...
                                                    </option>
                                                    <option value="currentlyReading">
                                                        Currently Reading
                                                    </option>
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
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
    );
}

export default HomePage;

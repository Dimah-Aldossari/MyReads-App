// import React, { useState, useEffect } from "react";
// import * as BooksAPI from "./BooksAPI";
// import "./App.css";

// function App() {
//   const [showSearchPage, setShowSearchpage] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [currentlyReading, setCurrentlyReading] = useState([]);
//   const [wantToRead, setWantToRead] = useState([]);
//   const [read, setRead] = useState([]);

//   useEffect(() => {
//     BooksAPI.getAll().then((books) => {
//       const currentlyReadingBooks = books.filter(
//         (book) => book.shelf === "currentlyReading"
//       );
//       const wantToReadBooks = books.filter((book) => book.shelf === "wantToRead");
//       const readBooks = books.filter((book) => book.shelf === "read");

//       setCurrentlyReading(currentlyReadingBooks);
//       setWantToRead(wantToReadBooks);
//       setRead(readBooks);
//     });
//   }, []);

//   useEffect(() => {
//     if (searchQuery) {
//       BooksAPI.search(searchQuery, 20).then((results) => {
//         if (results.error) {
//           console.error("Search API Error:", results.error);
//           setSearchResults([]);
//         } else {
//           setSearchResults(results);
//         }
//       }).catch((error) => {
//         console.error("Error fetching search results:", error);
//         setSearchResults([]);
//       });
//     } else {
//       setSearchResults([]);
//     }
//   }, [searchQuery]);


//   const handleShelfChange = (book, shelf) => {
//     BooksAPI.update(book, shelf).then(() => {
//       BooksAPI.getAll().then((books) => {
//         const currentlyReadingBooks = books.filter(
//           (b) => b.shelf === "currentlyReading"
//         );
//         const wantToReadBooks = books.filter((b) => b.shelf === "wantToRead");
//         const readBooks = books.filter((b) => b.shelf === "read");

//         setCurrentlyReading(currentlyReadingBooks);
//         setWantToRead(wantToReadBooks);
//         setRead(readBooks);
//       });
//     });
//   };

//   return (
//     <div className="app">
//       {showSearchPage ? (
//         <div className="search-books">
//           <div className="search-books-bar">
//             <a
//               className="close-search"
//               onClick={() => setShowSearchpage(false)}
//             >
//               Close
//             </a>
//             <div className="search-books-input-wrapper">
//               <input
//                 type="text"
//                 placeholder="Search by title or author"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
//           </div>
//           <div className="search-books-results">
//             <ol className="books-grid">
//               {searchResults.map((book) => (
//                 <li key={book.id}>
//                   <div className="book">
//                     <div className="book-top">
//                       <div
//                         className="book-cover"
//                         style={{
//                           width: 128,
//                           height: 193,
//                           backgroundImage: `url("${book.imageLinks.thumbnail}")`,
//                         }}
//                       ></div>
//                       <div className="book-shelf-changer">
//                         <select
//                           value={book.shelf || "none"}
//                           onChange={(e) =>
//                             handleShelfChange(book, e.target.value)
//                           }
//                         >
//                           <option value="none" disabled>
//                             Move to...
//                           </option>
//                           <option value="currentlyReading">
//                             Currently Reading
//                           </option>
//                           <option value="wantToRead">Want to Read</option>
//                           <option value="read">Read</option>
//                           <option value="none">None</option>
//                         </select>
//                       </div>
//                     </div>
//                     <div className="book-title">{book.title}</div>
//                     <div className="book-authors">
//                       {book.authors ? book.authors.join(", ") : "Unknown Author"}
//                     </div>
//                   </div>
//                 </li>
//               ))}
//             </ol>
//           </div>
//         </div>
//       ) : (
//         <div className="list-books">
//           <div>
//             <div className="bookshelf">
//               <h2 className="bookshelf-title">Currently Reading</h2>
//               <div className="bookshelf-books">
//                 <ol className="books-grid">
//                   {currentlyReading.map((book) => (
//                     <li key={book.id}>
//                       <div className="book">
//                         <div className="book-top">
//                           <div
//                             className="book-cover"
//                             style={{
//                               width: 128,
//                               height: 193,
//                               backgroundImage: `url("${book.imageLinks.thumbnail}")`,
//                             }}
//                           ></div>
//                           <div className="book-shelf-changer">
//                             <select
//                               value="currentlyReading"
//                               onChange={(e) =>
//                                 handleShelfChange(book, e.target.value)
//                               }
//                             >
//                               <option value="none" disabled>
//                                 Move to...
//                               </option>
//                               <option value="currentlyReading">
//                                 Currently Reading
//                               </option>
//                               <option value="wantToRead">Want to Read</option>
//                               <option value="read">Read</option>
//                               <option value="none">None</option>
//                             </select>
//                           </div>
//                         </div>
//                         <div className="book-title">{book.title}</div>
//                         <div className="book-authors">
//                           {book.authors ? book.authors.join(", ") : "Unknown Author"}
//                         </div>
//                       </div>
//                     </li>
//                   ))}
//                 </ol>
//               </div>
//             </div>
//             <div className="bookshelf">
//               <h2 className="bookshelf-title">Want to Read</h2>
//               <div className="bookshelf-books">
//                 <ol className="books-grid">
//                   {wantToRead.map((book) => (
//                     <li key={book.id}>
//                       <div className="book">
//                         <div className="book-top">
//                           <div
//                             className="book-cover"
//                             style={{
//                               width: 128,
//                               height: 193,
//                               backgroundImage: `url("${book.imageLinks.thumbnail}")`,
//                             }}
//                           ></div>
//                           <div className="book-shelf-changer">
//                             <select
//                               value="wantToRead"
//                               onChange={(e) =>
//                                 handleShelfChange(book, e.target.value)
//                               }
//                             >
//                               <option value="none" disabled>
//                                 Move to...
//                               </option>
//                               <option value="currentlyReading">
//                                 Currently Reading
//                               </option>
//                               <option value="wantToRead">Want to Read</option>
//                               <option value="read">Read</option>
//                               <option value="none">None</option>
//                             </select>
//                           </div>
//                         </div>
//                         <div className="book-title">{book.title}</div>
//                         <div className="book-authors">
//                           {book.authors ? book.authors.join(", ") : "Unknown Author"}
//                         </div>
//                       </div>
//                     </li>
//                   ))}
//                 </ol>
//               </div>
//             </div>
//             <div className="bookshelf">
//               <h2 className="bookshelf-title">Read</h2>
//               <div className="bookshelf-books">
//                 <ol className="books-grid">
//                   {read.map((book) => (
//                     <li key={book.id}>
//                       <div className="book">
//                         <div className="book-top">
//                           <div
//                             className="book-cover"
//                             style={{
//                               width: 128,
//                               height: 193,
//                               backgroundImage: `url("${book.imageLinks.thumbnail}")`,
//                             }}
//                           ></div>
//                           <div className="book-shelf-changer">
//                             <select
//                               value="read"
//                               onChange={(e) =>
//                                 handleShelfChange(book, e.target.value)
//                               }
//                             >
//                               <option value="none" disabled>
//                                 Move to...
//                               </option>
//                               <option value="currentlyReading">
//                                 Currently Reading
//                               </option>
//                               <option value="wantToRead">Want to Read</option>
//                               <option value="read">Read</option>
//                               <option value="none">None</option>
//                             </select>
//                           </div>
//                         </div>
//                         <div className="book-title">{book.title}</div>
//                         <div className="book-authors">
//                           {book.authors ? book.authors.join(", ") : "Unknown Author"}
//                         </div>
//                       </div>
//                     </li>
//                   ))}
//                 </ol>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       <div className="open-search">
//         <a
//           onClick={(e) => {
//             e.preventDefault();
//             console.log("Add a book link clicked");
//             setShowSearchpage(!showSearchPage);
//             setSearchQuery("");
//           }}
//         >
//           Add a book
//         </a>

//       </div>
//     </div>
//   );
// }

// export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";
import SearchPage from "./SearchPage";
import HomePage from "./HomePage";
import "./App.css";
// import Navigation from "./Navigation";

function App() {
  return (
    <>
      {/* <Navigation /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </>

  );
}

export default App;

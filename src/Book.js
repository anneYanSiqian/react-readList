import React from 'react'

function SearchBooks(props) {
  const { move, books } = props
  return (
    <div className="bookshelf-books">
      <ol className="books-grid">
        {books.map((book)=> (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks&& book.imageLinks.thumbnail ? book.imageLinks.thumbnail : 'http://books.google.com/books/content?id=sJf1vQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'})` }}></div>
                <div className="book-shelf-changer">
                  <select onChange={(event)=> move(book, event.target.value)} value={book.shelf ? book.shelf : "none"}>
                    <option value="move" disabled key="move">Move to...</option>
                    <option value="currentlyReading" key="currentlyReading">Currently Reading</option>
                    <option value="wantToRead" key="wantToRead">Want to Read</option>
                    <option value="read" key="read">Read</option>
                    <option value="none" key="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title? book.title: '--'}</div>
              <div className="book-authors">{book.authors? book.authors.join(','): '--'}</div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
export default SearchBooks
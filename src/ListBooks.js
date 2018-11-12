import React  from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
function ListBooks(props) {
  const { books, move } = props
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <Book
              move={move}
              books={books.filter(book => book.shelf === 'currentlyReading')}
            />
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <Book
              move={move}
              books={books.filter(book => book.shelf === 'wantToRead')}
            />
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <Book
              move={move}
              books={books.filter(book => book.shelf === 'read')}
            />
          </div>
        </div>
      </div>
      <Link
        to="/search"
        className="open-search">Add a book</Link>
    </div>
  )
}
export default ListBooks
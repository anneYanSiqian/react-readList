import React, { Component }  from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI.js'
import Book from './Book'

class SearchBooks extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    query: ''
  }
  search = (query, shelfBooks)=> {
    // this.setState({query: query, books: []})
    if (query) {
      BooksAPI.search(query).then(searchBooks=> {
        this.setState(()=> {
          const newSearchBooks = searchBooks.map(searchBook => {
            // 如果该图书在书架中，会返回该图书，否则返回 undefined
            const searchBookInshelfBook = shelfBooks.find(
              shelfBook => shelfBook.id === searchBook.id
            );

            // 同步 shelf 值，并返回该新的图书对象
            return {
              ...searchBook,
              shelf: searchBookInshelfBook
                ? searchBookInshelfBook.shelf
                : "none"
            };
          });
          // 返回新的搜索图书数据，更新界面
          return {
            books: newSearchBooks
          };
        })
        // this.setState({books: books})
      })
    }
  }
  render() {
    const { move, preBooks, returnList } = this.props
    const { books } = this.state
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            onClick={() => returnList()}
            to="/"
            className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author" onChange={(event)=> this.search(event.target.value.trim(), preBooks)}/>
            {!books.error && books.length > 0? <div className="list-books">
              <div className="list-books-content">
                <div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <Book
                      move={move}
                      books={books}
                    />
                  </div>
                </div>
              </div>
            </div>: null}
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
        </div>
      </div>
    )
  }
}
export default SearchBooks
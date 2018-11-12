import React from 'react'
import { Route } from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI.js'

class App extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    // showSearchPage: false,
    books: [],
    query: ''
  }

  componentDidMount() {
    BooksAPI.getAll().then(books=> {
      this.setState({books: books})
    })
  }

  bookMove = (book, shelf)=> {
    BooksAPI.update(book, shelf).then(book=> {
      BooksAPI.getAll().then(books=> {
        this.setState({books: books})
      })
    })
  }

  returnList = ()=> {
    this.setState({ query: '', books: [] })
    BooksAPI.getAll().then(books=> {
      this.setState({books: books})
    })
  }

  render() {
    const { books } = this.state
    console.log(books)
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <SearchBooks
            preBooks={books}
            move={this.bookMove}
            returnList={this.returnList}
          />
        )}/>
        <Route exact path='/' render={() => (
          <ListBooks
            books={books}
            move={this.bookMove}
          />
        )}/>
      </div>
    )
  }
}

export default App

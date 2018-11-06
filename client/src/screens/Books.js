import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

const MY_BOOKS = gql`
  query {
    books {
      title
    }
  }
`;

class Router extends Component {
  render() {
    if (this.props.data.isLoading || !this.props.data.books) return (<span>Loading</span>);
    if (this.props.data.error) return (<span>{this.props.data.error}</span>);
    return (
      <ul>
        {this.props.data.books.map((book) => (
          <li key={book.title}>{book.title}</li>
        ))}
      </ul>
    );
  }
}

export default graphql(MY_BOOKS)(Router);

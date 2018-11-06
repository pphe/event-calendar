import React, {Component} from 'react';
import {ApolloClient} from 'apollo-client';
import {ApolloProvider} from 'react-apollo';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloLink} from 'apollo-link';


class ApolloWrapper extends Component {
  constructor (props) {
    super (props);
    const httpLink = new HttpLink({
      uri: 'http://localhost:4000/graphql',
    });

    this.client = new ApolloClient({
      link: ApolloLink.from([
        httpLink,
      ]),
      cache: new InMemoryCache(),
    });
  }

  render () {
    return (
      <ApolloProvider client={this.client}>
        {this.props.children}
      </ApolloProvider>
    );
  }
}

export default ApolloWrapper;

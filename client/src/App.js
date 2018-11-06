import React, { Component } from 'react';

import ApolloWrapper from './ApolloWrapper';
import Router from './Router';

class App extends Component {
  render() {
    return (
      <ApolloWrapper>
        <Router />
      </ApolloWrapper>
    );
  }
}

export default App;

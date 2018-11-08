import React, { Component } from 'react';
import ApolloWrapper from './ApolloWrapper';
import Router from './Router';

/* react-router would be more ideal instead of
   the current Router component */

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

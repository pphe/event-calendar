import React, { Component } from 'react';

import Books from './screens/Books';
import EventCalendar from './screens/EventCalendar';

class Router extends Component {
    render() {
        const path = window.location.href;

        if (path.endsWith('/books')) return (<Books />);
        // Other paths
        if (path.endsWith('/eventcalendar') || path.endsWith('/'))
            return (<EventCalendar />);

        return <span>404</span>;
    }
}

export default Router;

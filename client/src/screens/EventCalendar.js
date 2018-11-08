import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { GET_EVENTS } from './queries';
import EventDetail from './EventDetail';
import AddEvent from './AddEvent';

const localizer = BigCalendar.momentLocalizer(moment);

const calendarStyle = {
    position: 'absolute',
    left: 25,
    top: 25,
    right: 25,
    bottom: 25
};

class EventCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetails: false,
            showAddEvent: false,
            currentEventId: null,
            selectedStartDate: null,
            selectedEndDate: null
        };

        this.showDetails = this.showDetails.bind(this);
        this.hideDetails = this.hideDetails.bind(this);
        this.addEvent = this.addEvent.bind(this);
        this.closeEvent = this.closeEvent.bind(this);
    }

    showDetails(event) {
        if (event) {
            this.setState({
                currentEventId: event.id,
                showDetails: !this.state.showDetails
            });
        }
    }

    hideDetails() {
        this.setState({ showDetails: !this.state.showDetails });
    }

    addEvent(event) {
        this.setState({
            showAddEvent: !this.state.showAddEvent,
            selectedStartDate: event.start,
            selectedEndDate: event.end
        });
    }

    closeEvent() {
        this.setState({
            showAddEvent: !this.state.showAddEvent,
        });
    }

    render() {
        const { loading, error, getEvents } = this.props.data;
        if (loading || !getEvents) return (<span>Loading...</span>);
        if (error) return (<span>{error}</span>);

        /* BigCalendar expects Date objects for 'start' and 'end' fields
           so make a copy of data and modify those fields */
        const eventsCopy = JSON.parse(JSON.stringify(getEvents));
        eventsCopy.forEach(event => {
            event.start = new Date(event.start);
            event.end = new Date(event.end);
        });

        return (
            <div>
                {
                    this.state.showDetails ?
                        <EventDetail id={this.state.currentEventId}
                            show={this.state.showDetails}
                            close={this.hideDetails} />
                        : null
                }
                {
                    this.state.showAddEvent ?
                        <AddEvent show={this.state.showAddEvent}
                            close={this.closeEvent}
                            selectedStart={this.state.selectedStartDate}
                            selectedEnd={this.state.selectedEndDate} />
                        : null
                }
                <div id='event-calendar' style={calendarStyle}>
                    <BigCalendar
                        selectable
                        localizer={localizer}
                        events={eventsCopy}
                        defaultView={BigCalendar.Views.MONTH}
                        scrollToTime={new Date(2010, 0, 1)}
                        defaultDate={new Date()}
                        onSelectEvent={(e) => this.showDetails(e)}
                        onSelectSlot={(e) => this.addEvent(e)}
                        startAccessor='start'
                        endAccessor='end'
                    />
                </div>
            </div>
        );
    }
}

export default graphql(GET_EVENTS)(EventCalendar);

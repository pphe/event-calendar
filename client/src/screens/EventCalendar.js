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
            showEventDetail: false,
            showAddEvent: false,
            currentEventId: null,
            selectedStartDate: null,
            selectedEndDate: null
        };
    }

    hideEventDetail = () => this.setState({ showEventDetail: !this.state.showEventDetail });
    showEventDetail = (event) => {
        if (event) {
            this.setState({
                currentEventId: event.id,
                showEventDetail: !this.state.showEventDetail
            });
        }
    }

    hideAddEvent = () => this.setState({ showAddEvent: !this.state.showAddEvent });
    showAddEvent = (event) => {
        this.setState({
            showAddEvent: !this.state.showAddEvent,
            selectedStartDate: event.start,
            selectedEndDate: event.end
        });
    }

    render() {
        const { loading, error, getEvents } = this.props.data;
        if (loading || !getEvents) return (<span>Loading...</span>);
        if (error) return (<span>{error}</span>);

        // BigCalendar expects event start and end fields to be
        // any representation of a Date object:
        // ex. via Date() toString(), toJSON(), getTime(), etc.

        return (
            <div>
                {
                    this.state.showEventDetail ?
                        <EventDetail
                            id={this.state.currentEventId}
                            show={this.state.showEventDetail}
                            hide={this.hideEventDetail} />
                        : null
                }
                {
                    this.state.showAddEvent ?
                        <AddEvent
                            show={this.state.showAddEvent}
                            hide={this.hideAddEvent}
                            selectedStart={this.state.selectedStartDate}
                            selectedEnd={this.state.selectedEndDate} />
                        : null
                }
                <div id='event-calendar' style={calendarStyle}>
                    <BigCalendar
                        selectable
                        localizer={localizer}
                        events={getEvents}
                        onSelectEvent={(e) => this.showEventDetail(e)}
                        onSelectSlot={(e) => this.showAddEvent(e)}
                    />
                </div>
            </div>
        );
    }
}

export default graphql(GET_EVENTS)(EventCalendar);

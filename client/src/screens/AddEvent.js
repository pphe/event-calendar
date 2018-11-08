import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { graphql } from 'react-apollo';
import { POST_EVENT, POST_EVENT_CONFIG } from './queries';
import NewEventForm from './NewEventForm';

class AddEvent extends Component {
    constructor(props) {
        super(props);
        this.postEvent = this.postEvent.bind(this);
    }

    postEvent(event) {
        const newEvent = {
            eventInput: {
                title: event.title,
                host: event.host,
                location: event.location,
                description: event.description,
                start: event.start,
                end: event.end,
            }
        };

        this.props.mutate({ variables: newEvent })
            .then((props) => this.props.close())
            .catch((err) => console.log('[postEvent mutation]', err));
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.close}>
                <Modal.Header>
                    <Modal.Title>Add new event</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <NewEventForm postEvent={this.postEvent} {...this.props} />
                </Modal.Body>
            </Modal>
        );
    }
}

            
export default graphql(POST_EVENT, POST_EVENT_CONFIG)(AddEvent);

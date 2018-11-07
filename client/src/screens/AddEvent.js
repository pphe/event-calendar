import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
// import { graphql } from 'react-apollo';
// import { POST_EVENT, POST_EVENT_CONFIG } from './queries';
import NewEventForm from './NewEventForm';

class AddEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            event: {}
        };
        this.postEvent = this.postEvent.bind(this);
    }

    postEvent(event) {
        console.log(event);
    }

    render() {
        // const { loading, error, getEvent } = this.props.data;

        // if (loading) return <span>Loading...</span>;
        // if (error) return <span>{error}</span>;

        return (
            <Modal show={this.props.show} onHide={this.props.close}>
                <Modal.Header>
                    <Modal.Title>Add new event</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <NewEventForm postEvent={this.postEvent}
                        close={this.props.close}
                        {...this.props}
                    />
                </Modal.Body>

                <Modal.Footer>
                    {/* <Button bsStyle="primary" onClick={this.addEvent}>Add Event</Button>
                    <Button bsStyle="default" onClick={this.props.close}>Cancel</Button> */}
                </Modal.Footer>
            </Modal>
        );
    }
}

// export default graphql(ADD_EVENT, ADD_EVENT_CONFIG)(AddEvent);
export default AddEvent;
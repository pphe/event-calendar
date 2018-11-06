import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { graphql } from 'react-apollo';
import { GET_EVENT, GET_EVENT_CONFIG } from './queries';

class EventDetail extends Component {
    render() {
        const { loading, error, getEvent } = this.props.data;

        if (loading) return <span>Loading...</span>;
        if (error) return <span>{error}</span>;

        return (
            <Modal show={this.props.show} onHide={this.props.close}>
                <Modal.Header>
                    <Modal.Title>{getEvent.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <h5>Hosted by {getEvent.host}</h5>
                    <p>Address: {getEvent.location}</p>
                    <p>
                        {new Date(getEvent.start).toLocaleString()}
                        <span> to </span>
                        {new Date(getEvent.end).toLocaleString()}
                    </p>
                    <p>{getEvent.description}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button bsStyle='primary' onClick={this.props.close}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default graphql(GET_EVENT, GET_EVENT_CONFIG)(EventDetail);

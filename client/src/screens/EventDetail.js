import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import { graphql } from 'react-apollo';
import { GET_EVENT, GET_EVENT_CONFIG } from './queries';

class EventDetail extends Component {
    render() {
        const { show, hide } = this.props;
        const { loading, error, getEvent } = this.props.data;
        if (loading) return <span>Loading...</span>;
        if (error) return <span>{error}</span>;

        return (
            <Modal show={show} onHide={hide}>
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
                    <Button bsStyle='primary' onClick={hide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

EventDetail.propTypes = {
    id: PropTypes.number.isRequired,
    show: PropTypes.bool.isRequired,
    hide: PropTypes.func.isRequired
};

export default graphql(GET_EVENT, GET_EVENT_CONFIG)(EventDetail);

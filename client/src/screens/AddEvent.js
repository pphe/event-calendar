import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Col } from 'react-bootstrap';
import { graphql } from 'react-apollo';
import { POST_EVENT, POST_EVENT_CONFIG } from './queries';
import NewEventForm from './NewEventForm';
import { dateToDateInput, dateToTimeInput, convertToDate } from '../util/date';

class AddEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: null,
            host: null,
            location: null,
            description: null,
            startDate: dateToDateInput(props.selectedStart),
            startTime: dateToTimeInput(props.selectedStart),
            endDate: dateToDateInput(props.selectedEnd),
            endTime: dateToTimeInput(props.selectedEnd)
        };
    }

    // handlers for onChange events of NewEventForm form components
    onChangeTitle = (e) => this.setState({ title: e.target.value });
    onChangeHost = (e) => this.setState({ host: e.target.value });
    onChangeLocation = (e) => this.setState({ location: e.target.value });
    onChangeDescription = (e) => this.setState({ description: e.target.value });
    onChangeStartDate = (e) => this.setState({ startDate: e.target.value });
    onChangeStartTime = (e) => this.setState({ startTime: e.target.value });
    onChangeEndDate = (e) => this.setState({ endDate: e.target.value });
    onChangeEndTime = (e) => this.setState({ endTime: e.target.value });

    submitForm = () => {
        const start = convertToDate(this.state.startDate, this.state.startTime);
        const end = convertToDate(this.state.endDate, this.state.endTime);

        if (start.getTime() >= end.getTime()) {
            window.alert('The start date must be before the end date!');
            return;
        }

        this.props.mutate({
            variables: {
                eventInput: {
                    title: this.state.title,
                    host: this.state.host,
                    location: this.state.location,
                    description: this.state.description,
                    start: start,
                    end: end
                }
            }
        })
            .then((props) => this.props.hide())
            .catch((err) => console.log('[postEvent mutation]', err));
    }

    render() {
        const { show, hide } = this.props;
        return (
            <Modal show={show} onHide={hide}>
                <Modal.Header>
                    <Modal.Title>Add new event</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <NewEventForm
                        onChangeTitle={this.onChangeTitle}
                        onChangeHost={this.onChangeHost}
                        onChangeLocation={this.onChangeLocation}
                        onChangeDescription={this.onChangeDescription}
                        onChangeStartDate={this.onChangeStartDate}
                        onChangeStartTime={this.onChangeStartTime}
                        onChangeEndDate={this.onChangeEndDate}
                        onChangeEndTime={this.onChangeEndTime}
                        startDate={this.state.startDate}
                        startTime={this.state.startTime}
                        endDate={this.state.endDate}
                        endTime={this.state.endTime}
                    />
                </Modal.Body>

                <Modal.Footer>
                    <Col sm={2} smOffset={6}>
                        <Button bsStyle="primary" onClick={this.submitForm}>Add Event</Button>
                    </Col>
                    <Col sm={1}>
                        <Button bsStyle="default" onClick={hide}>Cancel</Button>
                    </Col>
                </Modal.Footer>
            </Modal>
        );
    }
}

AddEvent.propTypes = {
    show: PropTypes.bool.isRequired,
    hide: PropTypes.func.isRequired,
    selectedStart: PropTypes.object,
    selectedEnd: PropTypes.object
};

export default graphql(POST_EVENT, POST_EVENT_CONFIG)(AddEvent);

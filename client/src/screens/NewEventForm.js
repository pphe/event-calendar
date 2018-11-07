import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Col, ControlLabel, Button } from 'react-bootstrap';
import './NewEventForm.css';
import { dateToDateInput, dateToTimeInput, convertToDate } from '../util/date';

class NewEventForm extends Component {
    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm() {
        const event = {};
        event['title'] = this.title.value;
        event['host'] = this.host.value;
        event['location'] = this.location.value;
        event['description'] = this.description.value;
        event['start'] = convertToDate(this.startDate.value, this.startTime.value);
        event['end'] = convertToDate(this.endDate.value, this.endTime.value);
        this.props.postEvent(event);
        this.props.close();
    }

    /* validations should go here and set via validationState property
       for each FormControl component */

    componentDidMount() {
        // set initial values from selected time slots
        this.startDate.value = dateToDateInput(this.props.selectedStart);
        this.startTime.value = dateToTimeInput(this.props.selectedStart);
        this.endDate.value = dateToDateInput(this.props.selectedEnd);
        this.endTime.value = dateToTimeInput(this.props.selectedEnd);
    }

    render() {
        // 30-min intervals for input time elements
        const timeInputStep = 1800;
        return (
            <Form horizontal>
                <FormGroup controlId='title'>
                    <Col componentClass={ControlLabel} sm={2}>Title</Col>
                    <Col sm={8}><FormControl inputRef={ref => this.title = ref}
                        type='text' placeholder='Title' /></Col>
                </FormGroup>

                <FormGroup controlId='host'>
                    <Col componentClass={ControlLabel} sm={2}>Host</Col>
                    <Col sm={8}>
                        <FormControl type='text' placeholder='Host'
                            inputRef={ref => this.host = ref} />
                    </Col>
                </FormGroup>

                <FormGroup controlId='location'>
                    <Col componentClass={ControlLabel} sm={2}>Location</Col>
                    <Col sm={8}>
                        <FormControl type='text' placeholder='Location'
                            inputRef={ref => this.location = ref} />
                    </Col>
                </FormGroup>

                <FormGroup controlId='description'>
                    <Col componentClass={ControlLabel} sm={2}>Description</Col>
                    <Col sm={8}>
                        <FormControl componentClass='textarea'
                            bsStyle='form-control custom-textarea'
                            inputRef={ref => this.description = ref}
                            placeholder='Description' />
                    </Col>
                </FormGroup>

                <FormGroup controlId='start'>
                    <Col componentClass={ControlLabel} sm={2}>Start date</Col>
                    <Col sm={4}>
                        <FormControl type='date' inputRef={ref => this.startDate = ref} />
                    </Col>
                    <Col componentClass={ControlLabel} sm={1}>Time</Col>
                    <Col sm={3}>
                        <FormControl type='time' step={timeInputStep}
                            inputRef={ref => this.startTime = ref} />
                    </Col>
                </FormGroup>

                <FormGroup controlId='end'>
                    <Col componentClass={ControlLabel} sm={2}>End date</Col>
                    <Col sm={4}>
                        <FormControl type='date' inputRef={ref => this.endDate = ref} />
                    </Col>
                    <Col componentClass={ControlLabel} sm={1}>Time</Col>
                    <Col sm={3}>
                        <FormControl type='time' step={timeInputStep}
                            inputRef={ref => this.endTime = ref} />
                    </Col>
                </FormGroup>
                <FormGroup controlId='buttons'>
                    <Col sm={2} smOffset={6}>
                        <Button bsStyle="primary" onClick={this.submitForm}>Add Event</Button>
                    </Col>
                    <Col sm={1}>
                        <Button bsStyle="default" onClick={this.props.close}>Cancel</Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}

export default NewEventForm;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap';
import './NewEventForm.css';

class NewEventForm extends Component {

    /* validations should go here and set via validationState property
       for each FormControl component */

    render() {
        const {
            onChangeTitle,
            onChangeHost,
            onChangeLocation,
            onChangeDescription,
            onChangeStartDate,
            onChangeStartTime,
            onChangeEndDate,
            onChangeEndTime,
            startDate,
            startTime,
            endDate,
            endTime
        } = this.props;

        // 30-min intervals for input time elements
        const timeInputStep = 1800;
        return (
            <Form horizontal >
                <FormGroup controlId='title'>
                    <Col componentClass={ControlLabel} sm={2}>Title</Col>
                    <Col sm={9}>
                        <FormControl type='text' placeholder='Title'
                            onChange={onChangeTitle} />
                    </Col>
                </FormGroup>

                <FormGroup controlId='host'>
                    <Col componentClass={ControlLabel} sm={2}>Host</Col>
                    <Col sm={9}>
                        <FormControl type='text' placeholder='Host'
                            onChange={onChangeHost} />
                    </Col>
                </FormGroup>

                <FormGroup controlId='location'>
                    <Col componentClass={ControlLabel} sm={2}>Location</Col>
                    <Col sm={9}>
                        <FormControl type='text' placeholder='Location'
                            onChange={onChangeLocation} />
                    </Col>
                </FormGroup>

                <FormGroup controlId='description'>
                    <Col componentClass={ControlLabel} sm={2}>Description</Col>
                    <Col sm={9}>
                        <FormControl componentClass='textarea' placeholder='Description'
                            bsStyle='form-control custom-textarea'
                            onChange={onChangeDescription}
                        />
                    </Col>
                </FormGroup>

                <FormGroup controlId='start'>
                    <Col componentClass={ControlLabel} sm={2}>Start date</Col>
                    <Col sm={4}>
                        <FormControl type='date' value={startDate} onChange={onChangeStartDate} />
                    </Col>
                    <Col componentClass={ControlLabel} sm={1} smOffset={1}>Time</Col>
                    <Col sm={3}>
                        <FormControl type='time' value={startTime} step={timeInputStep}
                            onChange={onChangeStartTime} />
                    </Col>
                </FormGroup>

                <FormGroup controlId='end'>
                    <Col componentClass={ControlLabel} sm={2}>End date</Col>
                    <Col sm={4}>
                        <FormControl type='date' value={endDate} onChange={onChangeEndDate} />
                    </Col>
                    <Col componentClass={ControlLabel} sm={1} smOffset={1}>Time</Col>
                    <Col sm={3}>
                        <FormControl type='time' value={endTime} step={timeInputStep}
                            onChange={onChangeEndTime} />
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}

NewEventForm.propTypes = {
    onChangeTitle: PropTypes.func.isRequired,
    onChangeHost: PropTypes.func.isRequired,
    onChangeLocation: PropTypes.func.isRequired,
    onChangeDescription: PropTypes.func.isRequired,
    onChangeStartDate: PropTypes.func.isRequired,
    onChangeStartTime: PropTypes.func.isRequired,
    onChangeEndDate: PropTypes.func.isRequired,
    onChangeEndTime: PropTypes.func.isRequired,
    startDate: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired
};

export default NewEventForm;

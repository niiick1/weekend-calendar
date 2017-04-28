import React, { Component } from 'react'
import { Button, ControlLabel, HelpBlock, Form, FormControl, FormGroup, Modal } from 'react-bootstrap'
import moment from 'moment'
import './EventCreator.css'

function getHourOptions() {
  let hourOptions = []

  for (let hour = 0; hour < 24; hour++) {
    let hourStr = hour
    
    if (hour < 10) {
      hourStr = '0' + hourStr;
    }

    hourOptions.push(
      <option 
        key={'eventcreator-hours-' + hourStr}
        value={hourStr}
      >
        {hourStr}
      </option>
    )
  }

  return hourOptions
}

function getMinutesOptions() {
  let minutesOptions = []

  for (let min = 0; min < 60; min += 5) {
    let minStr = min

    if (min < 10) {
      minStr = '0' + min
    }

    minutesOptions.push(
      <option
        key={'eventcreator-minutes-' + minStr}
        value={minStr}
      >
        {minStr}
      </option>
    )
  }

  return minutesOptions
}

class EventCreator extends Component {
  constructor(props) {
    super(props)

    this.state = {
      event: '',
      when: '',
      selectedHour: '00',
      selectedMinute: '00',
      isEventNameValid: true
    }
  }

  static defaultProps = {
    eventDate: new Date(),
    onSave: () => {},
    onClose: () => {}
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.eventDate !== this.state.when) {
      this.setState({ when: nextProps.eventDate });
    }

    if (nextProps.open && nextProps.open !== this.props.open) {
      this.setState({
        selectedHour: '00',
        selectedMinute: '00',
        event: '',
        isEventNameValid: true  
      })
    }
  }

  onSave() {
    if (!this.validate()) return

    let selectedDate = new Date(this.state.when)

    selectedDate.setHours(this.state.selectedHour)
    selectedDate.setMinutes(this.state.selectedMinute)

    this.props.onSave({
      name: this.state.event,
      date: selectedDate
    });
  }

  onClose() {
    this.props.onClose()
  }

  handleChange(e) {
    const fieldName = e.target.name
    let fieldValue = e.target.value

    if (fieldName === 'event') {
      fieldValue = fieldValue.trim()

      this.setState({
        isEventNameValid: !!fieldValue
      })
    }

    this.setState({
      [fieldName]: fieldValue
    })
  }

  formatDate(date) {
    return moment(date).format('DD/MM/YYYY')
  }

  validate() {
    let fieldValue = this.eventInput.props.value

    fieldValue = fieldValue.trim()

    let isFormValid = !!fieldValue

    this.setState({
      isEventNameValid: isFormValid
    })

    return isFormValid
  }

  render() {
    let showHelpBlock = this.state.isEventNameValid ? null : <HelpBlock>The event name is required.</HelpBlock>

    return (
      <div>
        <Modal show={this.props.open} onHide={() => this.onClose()}>
          <Modal.Header>
            New event
          </Modal.Header>

          <Modal.Body>
            <form>
              <FormGroup controlId='event-creator-form-event' validationState={this.state.isEventNameValid ? null : 'error'}>
                <ControlLabel>Event</ControlLabel>
                <FormControl
                  type='text'
                  name='event'
                  value={this.state.event}
                  placeholder='Name of the event...'
                  onChange={(e) => this.handleChange(e)}
                  ref={(input) => {this.eventInput = input}}
                />
                {showHelpBlock}
              </FormGroup>
                
              <FormGroup controlId='event-creator-form-when'>
                <ControlLabel>When</ControlLabel>
                <FormControl
                  type='text'
                  name='when'
                  value={this.formatDate(this.state.when)}
                  placeholder='Date of the event...'
                  onChange={(e) => this.handleChange(e)}
                  disabled
                />
              </FormGroup>
            </form>
            
            <Form inline>
              <ControlLabel>At</ControlLabel>
              {' '}
              <FormControl 
                componentClass='select'
                name='selectedHour'
                value={this.state.selectedHour}
                onChange={(e) => this.handleChange(e)}
              >
                {getHourOptions()}
              </FormControl>
              {' '}
              <FormControl 
                componentClass='select'
                name='selectedMinute'
                value={this.state.selectedMinute}
                onChange={(e) => this.handleChange(e)}
              >
                {getMinutesOptions()}
              </FormControl>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button
              disabled={!this.state.isEventNameValid} 
              onClick={(e) => this.onSave()}
            >
              Save
            </Button>
            <Button onClick={(e) => this.onClose()}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default EventCreator
import React, { Component } from 'react'
import { Button, ControlLabel, FormControl, FormGroup, Modal } from 'react-bootstrap'
import moment from 'moment'
import InputMoment from 'input-moment'
import 'input-moment/dist/input-moment.css'
import './EventCreator.css'

class EventCreator extends Component {
  constructor(props) {
    super(props)

    this.state = {
      event: '',
      when: '',
      isOpen: false,
      showDatePicker: false,
      selectedDate: moment()
    }
  }

  static defaultProps = {
    onSave: () => {},
    onClose: () => {}
  }

  onSave() {
    this.props.onSave({
      event: this.state.event,
      when: this.state.selectedDate
    });
  }

  onClose() {
    this.props.onClose();
  }

  onSelectDateClick() {
    this.setState({
      showDatePicker: true
    })
  }

  onDateChange(date) {
    this.setState({
      selectedDate: date
    })
  }

  onDatePicked(date) {
    this.setState({
      showDatePicker: false,
      when: this.state.selectedDate.format('llll')
    })
  }

  handleChange(e) {
    const fieldName = e.target.name

    this.setState({
      [fieldName]: e.target.value
    })
  }

  render() {
    let datepicker = <Modal show={this.state.showDatePicker} dialogClassName='event-creator-dialog'>
      <Modal.Body>
        <InputMoment
          moment={this.state.selectedDate}
          onChange={(date) => this.onDateChange(date)}
          onSave={() => this.onDatePicked()}
          prevMonthIcon='glyphicon glyphicon-menu-left'
          nextMonthIcon='glyphicon glyphicon-menu-right'
        />
      </Modal.Body>
    </Modal>

    return (
      // <div className={'event-creator' + (this.props.open ? ' open' : ' close')}>
      //   <div className={'event-creator-dialog' + (this.props.open ? ' open' : ' close')}>
      //     <div className='event-creator-content'>
      //       {'ALO'}
            // <form>
            //   <FormGroup controlId='event-creator-form'>
            //     <ControlLabel>Event</ControlLabel>
            //     <FormControl
                  // type='text'
                  // value={this.state.event}
                  // placeholder='Name of the event...'
                  // onChange={(e) => this.handleChange(e)}
                  // />
              // </FormGroup>
            // </form>
          // </div>
          // <Button onClick={(e) => this.onSave()}>Save</Button>
          // <Button onClick={(e) => this.onClose()}>Cancel</Button>
        // </div>
      // </div>

      <div>
        <Modal show={this.props.open} onHide={() => this.onClose()}>
          <Modal.Header>
            New event
          </Modal.Header>

          <Modal.Body>
            <form>
              <FormGroup controlId='event-creator-form'>
                <ControlLabel>Event</ControlLabel>
                <FormControl
                  type='text'
                  name='event'
                  value={this.state.event}
                  placeholder='Name of the event...'
                  onChange={(e) => this.handleChange(e)}
                />
                
                <ControlLabel>When</ControlLabel>
                <FormControl
                  type='text'
                  name='when'
                  value={this.state.when}
                  placeholder='Date and time of the event...'
                  onClick={(e) => this.onSelectDateClick(e)}
                  onChange={(e) => this.handleChange(e)}
                />

              </FormGroup>
            </form>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={(e) => this.onSave()}>Save</Button>
            <Button onClick={(e) => this.onClose()}>Cancel</Button>
          </Modal.Footer>
        </Modal>

        {datepicker}
      </div>
    )
  }
}

export default EventCreator
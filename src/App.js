import React, { Component } from 'react'
import './App.css'
import Calendar from './calendar/Calendar'
import EventList from './calendar/EventList'
import EventCreator from './calendar/EventCreator'

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      events: []
    }
  }

  handleDayClick(date, events) {
    this.setState({
      events: events,
      selectedDate: date
    })
  }

  handleEventAdd() {
    this.setState({
      displayEventCreator: true
    })
  }

  onEventCreated(newEvent) {
    console.log(newEvent)
  }

  onEventCreatorClose() {
    this.setState({
      displayEventCreator: false
    })
  }

  getDayTitle(date) {
    if (date)
      return `${MONTH_NAMES[date.getMonth()]} ${date.getDate()} - Events`

    return ''
  }

  render() {
    return (
      <div className='App'>
        <div className='app-container'>
          <Calendar onDayClick={(date, events) => this.handleDayClick(date, events)} />
          <div className='app-event-list-container'>
          {
            this.state.selectedDate &&
            <EventList
              events={this.state.events} 
              title={this.getDayTitle(this.state.selectedDate)}
              onEventAdd={() => this.handleEventAdd()}
            />
          }
          </div>
          <EventCreator 
            open={this.state.displayEventCreator}
            onSave={(newEvent) => this.onEventCreated(newEvent)}
            onClose={() => this.onEventCreatorClose()} />
        </div>
      </div>
    );
  }
}

export default App

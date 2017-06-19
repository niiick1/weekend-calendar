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
      events: {}
    }
  }

  componentDidMount() {
    fetch('/events')
      .then(res => res.json())
      .then(({events}) => {
        Object.keys(events).forEach(key => {
          events[key] = events[key].map(event => {
            event.date = new Date(event.date)
            return event
          })
        })

        return {events}
      })
      .then(events => this.setState(events))
  }

  handleDayClick(date, events) {
    this.setState({
      dayEvents: events,
      selectedDate: date
    })
  }

  handleEventAdd() {
    this.setState({
      displayEventCreator: true
    })
  }

  onEventCreated(newEvent) {
    this.addEvent(newEvent)
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

  addEvent(event) {
    let events = this.state.events,
      eventDate = event.date,
      eventKey = `${eventDate.getFullYear()}-${eventDate.getMonth()}-${eventDate.getDate()}`

    if (events[eventKey]) {
      events[eventKey].push(event)
    } else {
      events[eventKey] = [event]
    }

    this.setState({
      event: events,
      dayEvents: events[eventKey],
      displayEventCreator: false
    })
  }

  render() {
    return (
      <div className='App'>
        <div className='app-container'>
          <Calendar 
            events={this.state.events} 
            onDayClick={(date, events) => this.handleDayClick(date, events)}
          />
          <div className='app-event-list-container'>
          {
            this.state.selectedDate &&
            <EventList
              events={this.state.dayEvents} 
              title={this.getDayTitle(this.state.selectedDate)}
              onEventAdd={() => this.handleEventAdd()}
            />
          }
          </div>
          <EventCreator 
            open={this.state.displayEventCreator}
            eventDate={this.state.selectedDate}
            onSave={(newEvent) => this.onEventCreated(newEvent)}
            onClose={() => this.onEventCreatorClose()} />
        </div>
      </div>
    );
  }
}

export default App

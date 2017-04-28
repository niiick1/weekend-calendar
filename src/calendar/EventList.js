import React, { Component } from 'react'
import './EventList.css'

class EventList extends Component {

  formatHour(date) {
    let hours = date.getHours(),
      minutes = date.getMinutes(),
      ampm = hours >= 12 ? 'pm' : 'am'

    if (hours !== 12) {
      hours %= 12
    }

    if (hours < 10) {
      hours = `0${hours}`
    }

    if (minutes < 10) {
      minutes = `0${minutes}`
    }

    return `${hours}:${minutes} ${ampm}`
  }

  addEvent() {
    this.props.onEventAdd();
  }

  render() {
    return (
      <div className='event-list'>
        <div className='event-list-header'>
          <span>{this.props.title}</span>
          <i 
            className='icon-plus'
            onClick={e => this.addEvent(e)}
          />
        </div>
        {
          this.props.events.map((event, idx) => {
            return (
              <div
                key={`event-${idx}`}
                className='event-row'
              >
                <div className='event-hour'>{this.formatHour(event.date)}</div>
                <span>{event.name}</span>
              </div>
            )
          })
        }

        {
          this.props.events.length < 1 && (
            <div className='event-row'>No events!</div>
          )
        }
      </div>
    )
  }
}

EventList.defaultProps =  {
  onEventAdd: () => {console.log('a')}
}

export default EventList
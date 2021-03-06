import React, { Component } from 'react'
import './Calendar.css'

let weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

let today = new Date()

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
];

class Calendar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentMonth: new Date(today.getFullYear(), today.getMonth(), 1)
    }
  }

  previousMonth() {
    let currentMonth = this.state.currentMonth;

    this.setState({
      currentMonth: new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    });
  }

  nextMonth() {
    let currentMonth = this.state.currentMonth;

    this.setState({
      currentMonth: new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    });
  }

  goToToday() {
    this.setState({
      currentMonth: new Date(today.getFullYear(), today.getMonth(), 1)
    })

    this.handleDayClick(today)
  }

  getEvent(date) {
    let eventKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`

    return this.props.events[eventKey] || []
  }

  getDays(monthDate) {
    let days = [],
      firstDayWeekDay = monthDate.getDay(),
      year = monthDate.getFullYear(),
      month = monthDate.getMonth(),
      lastDayOfMonth = new Date(year, month + 1, 0),

      lastDayPreviousMonth = new Date(year, month, 0),
      previousMonthYear = lastDayPreviousMonth.getFullYear()

    for (let weekDay = 0; weekDay < firstDayWeekDay; weekDay++) {
      let day = lastDayPreviousMonth.getDate() - firstDayWeekDay + weekDay + 1,
        currentDate = new Date(previousMonthYear, lastDayPreviousMonth.getMonth(), day);

      days.push(
        <div
          key={'calendar-fill-day' + weekDay}
          className='calendar-fill-day'
          onClick={e => this.handleDayClick(currentDate, e)}
        >
          <span className={'calendar-day-number' + (this.getEvent(currentDate).length ? ' has-event': '')}>
            {day}
          </span>
        </div>
      )
    }

    for (let day = monthDate.getDate(), lastDay = lastDayOfMonth.getDate(); day <= lastDay; day++) {
      let currentDate = new Date(year, month, day);
      days.push(
        <div
          key={'calendar-day-' + day}
          className={
            'calendar-day' +
            (today.getFullYear() === year && today.getMonth() === month && today.getDate() === day ? ' calendar-today' : '') +
            (currentDate.getDay() === 0 || currentDate.getDay() === 6 ? ' calendar-weekend' : '')
          }
          onClick={e => this.handleDayClick(currentDate, e)}
        >
          <span className={'calendar-day-number' + (this.getEvent(currentDate).length ? ' has-event' : '')}>
            {day}
          </span>
        </div>
      )
    }

    return days
  }

  handleDayClick(date) {
    this.props.onDayClick(date, this.getEvent(date));
  }

  render() {
    return (
      <div className='calendar'>
        <div className='calendar-header'>
          <div className='calendar-header-controls'>
            <span 
              className='chevron left'
              onClick={e => this.previousMonth(e)}
            />
            <div className='calendar-header-info'>
              {`${MONTH_NAMES[this.state.currentMonth.getMonth()]} ${this.state.currentMonth.getFullYear()}`}
            </div>
            <span 
              className='chevron right'
              onClick={e => this.nextMonth(e)}
            />
          </div>
          <div className='calendar-header-weekdays'>
            {
              weekDays.map((day, idx) =>
                <div 
                  key={'weekday-' + idx}
                  className='calendar-weekday'
                >  
                  {day}
                </div>
              ) 
            }
          </div>
        </div>
        
        <div className='calendar-body'>
            {this.getDays(this.state.currentMonth)}
        </div>

        <div className='calendar-footer'>
          <button
            className='calendar-today-button'
            onClick={e => this.goToToday(e)}>
              Today
          </button>
        </div>
      </div>
    )
  }
}

export default Calendar;
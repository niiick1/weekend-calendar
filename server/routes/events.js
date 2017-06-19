var express = require('express');
var router = express.Router();

var Event = require('../modules/model/modelLibrary').Event

/* GET users listing. */
router.get('/', function(req, res, next) {
  Event.find(function(err, events) {
    if (err) return console.error(err);

    let eventMap = {}

    events.forEach(event => {
      let date = event.date

      if (date) {
        let eventKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`

        if (eventMap[eventKey]) {
          eventMap[eventKey].push(event)
        } else {
          eventMap[eventKey] = [event]
        }
      }
    })

    res.send({
      events: eventMap
    })
  })
})

router.post('/', function(req, res, next) {
  var {name, date} = req.body

  if (!name || !date) {
    next(new Error('Invalid request parameters'))
    return
  }

  var newEvent = new Event({
    name, date
  })

  newEvent.save(function(err, newEvent) {
    if(err) return console.error(err)

    res.send(newEvent);
  })

})

module.exports = router;

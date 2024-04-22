let events = [];
let going = true;

while (going) {
  let answer = prompt(
    'Type 1 to add a new event, 2 to see all events, 3 to search for an event, 4 to update an event, 5 to delete an event and nothing to exit'
  );

  switch (answer) {
    case '1':
      let newEvent = {
        id: events.length + 1,
        name: '',
        date: '',
        description: '',
      };

      newEvent.name = prompt("What's the name of this event?")
        .toLowerCase()
        .trim();

      let alreadyExists = false;

      if (events.length > 0) {
        events.forEach((el) => {
          if (newEvent.name == el.name) {
            alreadyExists = true;
          }
        });

        if (alreadyExists) {
          alert('Item already exists, change the name of the event');
          continue;
        }
      }

      newEvent.date = prompt("What's the event's date?").trim();
      newEvent.description = prompt("What's the event's description?").trim();
      events.push(newEvent);

      break;
    case '2':
      alert(`Your events are: ${events.map((el) => Object.values(el))}`);
      break;
    case '3':
      let eventName = prompt(
        "What's the name of the event you're searching for?"
      )
        .toLowerCase()
        .trim();

      let search;

      events.forEach((el) => {
        if (el.name == eventName) {
          search = el;
        }
      });

      if (search != undefined) {
        alert(`Your event is: ${Object.values(search)}`);
      } else {
        alert('Event not found');
      }
      break;
    case '4':
      let updateName = prompt(
        "What's the name of the event you want to update?"
      )
        .toLowerCase()
        .trim();

      let result;
      events.forEach((el) => {
        if (el.name == updateName) {
          result = el;
        }
      });

      if (result != undefined) {
        alert(`Your event is: ${Object.values(result)}`);
        let change = prompt(
          'What do you wish to change? name, date or description?'
        )
          .toLowerCase()
          .trim();

        if (change == 'name' || change == 'date' || change == 'description') {
          let newValue = prompt(`Please enter the new ${change}`)
            .toLowerCase()
            .trim();

          result[change] = newValue;
          events[events.indexOf(result)] = result;

          alert(Object.values(result));
        } else {
          alert('Field invalid');
        }
      } else {
        alert('Event not found');
      }
      break;
    case '5':
      let id = parseInt(
        prompt("What's the id of the item you want to eliminate?").trim()
      );

      if (id == NaN) {
        alert('Id invalid');
        continue;
      }

      events.splice(id - 1, 1);

      events.forEach((el) => {
        if (el.id > id - 1) {
          el.id -= 1;
        }
      });

      alert(`Your events are: ${events.map((el) => Object.values(el))}`);

      break;
    default:
      if (!answer) {
        going = false;
        alert('Program ended');
        break;
      }
      alert('Invalid answer');
  }
}

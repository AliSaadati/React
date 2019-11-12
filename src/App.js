import React, { Component } from 'react';
// React import is used for render() and Component is extended by our class
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { id: 'a', name: 'Al', age: 33 },
      { id: 'b', name: 'Darius', age: 5 },
      { id: 'c', name: 'Chiwi', age: 11 }
    ],
    otherPersons: 'Mr. Saadati',
    showPersons: false
  }

  switchNameHandler = (newName) => {
    //DONT DO THIS this.state.persons[0].name = "Alejandro";
    this.setState({
      persons: [
        { name: newName, age: 33 },
        { name: 'Alex', age: 5 },
        { name: 'Sara', age: 11 }
      ]
    })
  }

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    //const person = Object.assign({}, this.state.persons[personIndex]});
    const person = { ...this.state.persons[personIndex] };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({
      persons: persons
    });
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({
      showPersons: !doesShow
    });
  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  }

  render() {

    let persons = null;
    let btnClass = '';

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              click={() => this.deletePersonHandler(index)}
              name={person.name}
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangeHandler(event, person.id)} />
          })}
        </div>
      );
      btnClass = 'Red';
    }

    let classes = [];

    if (this.state.persons.length <= 2) {
      classes.push('red');
    }

    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
        <div className="App" >
          <h1>Hi, I'm a React Application!</h1>
          <p className={classes.join(' ')}>This is dynamic classes at play.</p>
          <button
            onClick={this.togglePersonsHandler}>Toggle People</button>
          {persons}
        </div>
    );
  }
}

export default App;

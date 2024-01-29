import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
export default class ExercisesList extends Component {

  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);

    this.state = {
      exercises: [],
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5005/exercises/')
      .then(res => this.setState({
        exercises: res.data,
      }))
      .catch(err => console.log('Err: ' + err));
  }

  deleteExercise(id) {
    axios.delete('http://localhost:5005/exercises/' + id)
      .then(res => console.log(res.data))
      .catch(err => console.log('Err: ' + err));
    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    })
  }

  render() {
    return(
      <div>
        <h3>Logged Exercises</h3>
        <table className='table'>
          <thead className='thead-light'>
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.exercises.map(currex => {
              return (
                <tr key={currex._id}>
                  <td>{currex.username}</td>
                  <td>{currex.description}</td>
                  <td>{currex.duration}</td>
                  <td>{currex.date.substring(0,10)}</td>
                  <td>
                    <Link to={"/edit/" + currex._id}>edit</Link> | <a href="#" onClick={() => { this.deleteExercise(currex._id)}}>Delete</a>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}
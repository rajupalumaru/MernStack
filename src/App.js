
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
function App() {
  const [item, setItem] = useState([]);
  const [newTask, setNewTask] = useState('');


  useEffect(() => {
    axios.get('http://localhost:5000/gettask')
      .then(
        arr => setItem(arr.data)
      )
  })

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/addtask', { todo: newTask })
      .then(
        arr => setItem(arr.data)
      )
  }
  const deleteHandler = id => {
    console.log("id",id);
    axios.delete(`http://localhost:5000/delete/${id}`)
      .then(
        arr => setItem(arr.data)
      )
  }
  return (
    <div>
      <center>
        <form onSubmit={submitHandler}>
          <input type="text" value={newTask}
            onChange={(e) => setNewTask(e.target.value)} />
          <input type='submit' value='sumit' />

        </form><br />
        {item.map(ele =>
          <div key={ele._id}>
            <h3>{ele.todo}</h3>
            <button onClick={() => deleteHandler(ele._id)}>Delete</button>
          </div>
        )}
      </center>
    </div>
  );
}

export default App;

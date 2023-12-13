import React, {useState} from 'react'
import axios from 'axios';

const TodoForm = ({setTodos, fetchData}) => {

  const [newTodo, setNewTodo] = useState({
    'description': ''
  })

  const handleChange = (e) => {
    setNewTodo(prev => ({
      ...prev,
      'description': e.target.value
    }))
    console.log(newTodo)
  }

  const postTodo = async () => {
    try{
      await axios.post('http://127.0.0.1:8000/api/todo/', newTodo)
      setNewTodo({'description': ''})
      fetchData()
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <div>
      <input type="text" placeholder="Add Todo" className="input input-bordered input-info w-full max-w-xs"
      onChange={handleChange} value={newTodo.description}

      // Add Todo Pressing Enter
      onKeyDown = {(e) => {
        if(e.key === 'Enter'){
          postTodo()
        }
      }}
      />
      <button onClick={postTodo} className="btn btn-active btn-primary ml-2">Add Todo</button>
    </div>
  )
}

export default TodoForm
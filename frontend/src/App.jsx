import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import TodoForm from './components/TodoForm'
import Table from './components/Table'


function App() {
  const [todos, setTodos] = useState('')
  const [isLoading, setLoading] = useState(true)

  useEffect( () => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/todo/')
      setTodos(response.data),
      setLoading(false)
    } catch (error) {
      console.log("error are: ", error)
    }
  }

  return (
    <div className='bg-indigo-100 px-8 min-h-screen'>
    
    <nav className='pt-8'>
       <h1  className="text-5xl text-center">ToDo List</h1>
    </nav>


    <TodoForm 
    setTodos = {setTodos}
    fetchData = {fetchData}
     />


    <Table 
    todos = {todos}
    setTodos = {setTodos}
    isLoading = {isLoading}
    />


    </div>
  )
}

export default App

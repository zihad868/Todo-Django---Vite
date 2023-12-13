import React, {useState} from 'react'
import axios from 'axios'

import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";



const Table = ({todos, setTodos, isLoading}) => {

  const [editText, setEditText] = useState({
    'description': ''
  })

  const handleDelete = async (id) => {
    try{
      await axios.delete(`http://127.0.0.1:8000/api/todo/${id}/`)

      // Delete Instalce 
      const newList = todos.filter(todo => todo.id != id)
      setTodos(newList)
    }
    catch(error){
      console.log(error)
    }
  }


  const handleEdit = async (id, value) => {
    try {
      const response = await axios.patch(`http://127.0.0.1:8000/api/todo/${id}/`, value)
      console.log(response.data);
      const newTodos = todos.map(todo => todo.id === id ? response.data : todo)
      setTodos(newTodos)
    } catch (error) {
      console.log(error);
    }
  }


  const handleCheckBox =  (id, value) => {
    handleEdit(id, {
      completed: !value
    })
  }

  const handleChange = (e) => {
    setEditText(prev => ({
      ...prev,
      'description': e.target.value
    }))
    console.log(editText)
  }

  const handleClick = () => {
    handleEdit(editText.id, editText)
    setEditText({
      'description': ""
    })
  }

  return (
    <div className='py-8'>
      <table className='w-11-12 max-w-4xl'>
        <thead>
          <tr className='border-b-2 border-black'>
            <th className='p-3 text-sm font-semibold tracking-wide text-left'>Checkbox</th>
            <th className='p-3 text-sm font-semibold tracking-wide text-left'>Todo</th>
            <th className='p-3 text-sm font-semibold tracking-wide text-left'>Status</th>
            <th className='p-3 text-sm font-semibold tracking-wide text-left'>Data Created</th>
            <th className='p-3 text-sm font-semibold tracking-wide text-left'>Actions</th>
          </tr>
        </thead>

        <tbody>
          {isLoading ? <div>Data Loading</div> : 
          <>
             {
              todos.map( (todoItem, index) => {
                return(
                  <tr className='border-b border-black'>

                  <th className='p-3 text-sm'>
                    <span onClick={() => handleCheckBox(todoItem.id, todoItem.completed)} className='inline-block cursor-pointer'>{todoItem.completed ? <MdCheckBox /> : <MdCheckBoxOutlineBlank /> } </span>
                  </th>

                  <th className='p-3 text-sm'>{todoItem.description}</th>

                  <th className='p-3 text-sm text-center'>
                    <span className={`p-1.5 text-xs font-medium tracking-wider rounded-md ${todoItem.completed ? 'bg-green-300' : 'bg-red-300'}`}>{todoItem.completed ? 'Complete' : 'Incomplate'}</span>
                    </th>

                  <th className='p-3 text-sm'>{new Date(todoItem.created).toLocaleString()}</th>
                  <th className='p-3 text-sm font-medium grid grid-flow-col items-center'>
                    <span className='text-xl'><a href="#my_modal_8" className="btn"> <FaRegEdit onClick={() => setEditText(todoItem)}/> </a></span>
                    <span className='text-xl'><RiDeleteBin6Line onClick={() => handleDelete(todoItem.id)}/></span>
                  </th>

                </tr>
                )
              })
            }
          </>
          }

        </tbody>
      </table>


{/* Put this part before </body> tag */}
<div className="modal" role="dialog" id="my_modal_8">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Edit Todo</h3>
    <input type="text" value={editText.description} onChange={handleChange} placeholder="Type here" className="input input-bordered w-full mt-8" />
    <div className="modal-action">
    <label htmlFor="my-modal" onClick={handleClick} className="btn btn-primary">Edit</label>
     <a href="#" className="btn">Close</a>
    </div>
  </div>
</div>

    </div>
  )
}

export default Table

import { createContext } from "react";
import { useEffect, useState } from 'react';
import axios from 'axios';

const tasksContext = createContext();

function Provider({children}){
    
    const [tasks, setTasks] = useState([])
    const createTask = async(title, taskDesc)=>{

    const response= await axios.post('http://localhost:3004/task',{
      title,
      taskDesc
    });
    console.log(response);
  const createdTask=[
    ...tasks,
      response.data    
  ];
  setTasks(createdTask);
  };

  const fetchTask= async()=>{
    const response= await axios.get('http://localhost:3004/task');
    setTasks(response.data);
  }
  const deleteTaskByID=async(id)=>{
    await axios.delete(`http://localhost:3004/task/${id}`);
   const afterDeleteTaks= tasks.filter((tasks)=>{
      return tasks.id !== id;
    })
    setTasks(afterDeleteTaks);
  };

  const editTaskById=async(id, updatedTitle, updatedTaskDesc)=>{
    await axios.put(`http://localhost:3004/task/${id}`,{
      title:updatedTitle,
      taskDesc:updatedTaskDesc
    });
    const updatedTask = tasks.map((tasks)=>{
      if(tasks.id === id){
        return {id, title:updatedTitle, taskDesc:updatedTaskDesc}
      }
      return tasks;
    });
    setTasks(updatedTask);
  }
    const sharedValuesAndMethods={
        tasks,
        createTask,
        fetchTask,
        deleteTaskByID,
        editTaskById
    }

    return (<tasksContext.Provider value={sharedValuesAndMethods}>{children}</tasksContext.Provider>);
}
export {Provider};
export default tasksContext;
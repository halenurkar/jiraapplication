import './App.css';
import TaskCreate from './components/TaskCreate';
import TaskList from './components/TaskList';
import { useEffect, useState } from 'react';
import axios from 'axios';
function App() {
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

  useEffect(()=>{
    fetchTask();
  },[])

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

  return (
    <div className="App">
      <TaskCreate onCreate={createTask}/>
      <h1>Görevler</h1>
      <TaskList tasks={tasks} onDelete={deleteTaskByID} onUpdate={editTaskById}/>
    </div>
  );
}

export default App;

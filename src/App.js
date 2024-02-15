import './App.css';
import TaskCreate from './components/TaskCreate';
import TaskList from './components/TaskList';
import { useState } from 'react';
function App() {
  const [tasks, setTasks] = useState([])
  const createTask =(title, taskDesc)=>{
  const createdTask=[
    ...tasks,{
      id:Math.round(Math.random()*999999),
      title,
      taskDesc
    }
  ];
  setTasks(createdTask);
  };

  const deleteTaskByID=(id)=>{
   const afterDeleteTaks= tasks.filter((tasks)=>{
      return tasks.id !== id;
    })
    setTasks(afterDeleteTaks);
  };

  const editTaskById=(id, updatedTitle, updatedTaskDesc)=>{
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

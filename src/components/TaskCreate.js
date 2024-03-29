import { useState } from "react"
import { useContext } from 'react';
import TasksContext from '../context/task';
function TaskCreate({task, taskFormUpdate,onUpdate}) {
    const {editTaskById, createTask} = useContext(TasksContext);

    const [Title, setTitle] = useState(task ? task.title : '');
    const [taskDesc, settaskDesc] = useState(task ? task.taskDesc : '');

    const handleChange =(event)=>{
        setTitle(event.target.value);
    }
    const handleTaskChange =(event)=>{
        settaskDesc(event.target.value);
    }
    const handleSubmit =(event)=>{
        event.preventDefault();
        if(taskFormUpdate){
            onUpdate(task.id, Title, taskDesc );
        }
        else{
            createTask(Title, taskDesc);
        }
        setTitle('');
        settaskDesc('');
    }
    return ( 
        <div>
            {taskFormUpdate ? 
            (<div className="task-update">
        <h3>Lütfen Taskı Düzenleyiniz!</h3>
        <form className="task-form">
            <label className="task-label">Başlığı Düzenleyiniz</label>
            <input value={Title} onChange={handleChange} className="task-input"/>
            <label className="task-label">Taskı Düzenleyiniz:</label>
            <textarea value={taskDesc} onChange={handleTaskChange} className="task-input" rows={5}/>
            <button className="task-button update-button" onClick={handleSubmit}>Düzenle</button>
        </form>
    </div>) 
    :
    (<div className="task-create">
        <h3>Lütfen Task Ekleyiniz!</h3>
        <form className="task-form">
            <label className="task-label">Başlık</label>
            <input value={Title} onChange={handleChange} className="task-input"/>
            <label className="task-label">Task Giriniz:</label>
            <textarea value={taskDesc} onChange={handleTaskChange} className="task-input" rows={5}/>
            <button className="task-button" onClick={handleSubmit}>Oluştur</button>
        </form>
    </div>) }
            </div>
     );
}

export default TaskCreate;
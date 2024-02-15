import { useState } from "react";
import TaskCreate from "./TaskCreate";

function TaskShow({task, onDelete, onUpdate}) {
    const [taskUpdate, settaskUpdate] = useState(false);
    const handleDelete =()=>{
        onDelete(task.id);
    }
    const handleEdit=()=>{
        settaskUpdate(!taskUpdate)
        
    }
    const handleSubmit =(id, updatedTitle, updatedTaskDesc)=>{
        settaskUpdate(false);
        onUpdate(id, updatedTitle, updatedTaskDesc);
    }
    return ( 
    <div className="task-show">
        {taskUpdate ? (<TaskCreate task={task} taskFormUpdate={true} onUpdate={handleSubmit}/>) :
        ( 
        <div>
            <h3 className="task-title">Göreviniz</h3>
        <p>{task.title}</p>
        <h3 className="task-title">Yapılacaklar</h3>
        <p>{task.taskDesc}</p>
        <div>
            <button className="task-delete" onClick={handleDelete}>Sil</button>
            <button className="task-edit" onClick={handleEdit}>Güncelle</button>

        </div>
        </div>

        )}
        
        
    </div> );
}

export default TaskShow;
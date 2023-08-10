import { useState } from "react";
import { nanoid } from "nanoid";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

export default function App(props) {

  const[tasks,setTasks] = useState(props.tasks);
  const tasksNoun = tasks.length !== 1 ? "tasks" : "task";
  const headingText = `${tasks.length} tasks remaining`;



  function addTask(name) {
    const newTask = {id:`todo-${nanoid()}`,name,completed:false};
    // console.log(newTask);
    setTasks([...tasks,newTask]);
    // alert(name);
  }

  function toggleTaskCompleted(id){
    const updatedTasks = tasks.map((task)=>{
      if(id===task.id){
        // console.log(task);
        return{...task,completed:!task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deletedTask(id){
    const remainingTasks = tasks.filter((task)=> id != task.id);
    setTasks(remainingTasks);
    console.log(id);
  }

  const taskList = tasks.map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deletedTask={deletedTask}
    />
  ));

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <FilterButton />
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

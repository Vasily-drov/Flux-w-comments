//IMPORTS
import React from "react";
import { useContext, useState } from "react";
import { Context } from "../store/appContext";
import Inputs from "./Inputs.jsx";

export const ToDoList = () => {
  function createPost() {
    //Create server page of name usertest197
    fetch("https://assets.breatheco.de/apis/fake/todos/user/usertest197", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log(resp.ok);
        console.log(resp.status);
        return resp.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        clickPost();
      });
  }

  //Delete server page and all tasks
  function clearFetch() {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/usertest197", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log(resp.ok);
        console.log(resp.status);
        return resp.json();
      })
      .then((data) => {
        console.log(data);
        actions.deleteAllTasks();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  //Access flux store
  const { store, actions } = useContext(Context);
  //Initialize useState variables
  const [textEntered, setTextEntered] = useState("");

  //set the value of the input to the characters entered
  function inputValue(e) {
    const inputBarValue = e.target.value;
    setTextEntered(inputBarValue);
  }

  //Appends task and calls action when "Enter" button is pressed
  function addNewTask(e) {
    if (e.key === "Enter") {
      actions.todoList(textEntered);
      setTextEntered("");
    }
  }

  //Call action to delete task by ID
  function deleteTask(id) {
    actions.deleteTask(id);
  }

  return (
    <div>
      <button onClick={createPost}>Post</button>
      <button onClick={clearFetch}>Delete All</button>
      <h1 className="todo-header">Todos</h1>
      <div className="todos-container d-flex flex-column">
        <div className="todos-container-header d-flex flex-row">
          <span className="me-3">Tasks</span>
          <input
            type="text"
            onChange={inputValue}
            onKeyDown={addNewTask}
            value={textEntered}
          />
        </div>
        <div className="todos-container-body flex-grow-1">
          <ul>
            {store.fetchTasks.map((task, index) => (
              <Inputs
                key={index}
                id={index}
                task={task}
                onDelete={deleteTask}
              />
            ))}
          </ul>
        </div>
        <div className="flex-grow-1">
          {store.fetchTasks.length === 0
            ? "No tasks, add a task"
            : `Number of Tasks: ${store.fetchTasks.length}`}
        </div>
      </div>
    </div>
  );
};

export default ToDoList;

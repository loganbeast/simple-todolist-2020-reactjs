import React, { Component } from 'react';

import './App.css';

import TaskForm from './components/TaskForm'
import Control from './components/Control'
import TaskList from './components/TaskList'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      displayForm: true
    };
  }
  componentDidMount() {
    if (localStorage && localStorage.getItem('tasks')) {
      let tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks: tasks

      });
    }
  }
  // generateID
  s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  generateId() {
    return this.s4() + this.s4() + '-' + this.s4() + this.s4() + this.s4() + '-' + this.s4() + this.s4();
  }
  // Open and close taskform
  openTaskForm = () => {
    this.setState({
      displayForm: !this.state.displayForm
    });
  }
  closeTaskForm = () => {
    this.setState({
      displayForm: !this.state.displayForm
    });
  }
  //handle save taskform
  onSubmit = (data) => {
    let {tasks} = this.state;
    data.id = this.generateId();
    tasks.push(data);
    this.setState({
      tasks : tasks
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
  };
  onUpdateStatus = (id) => {
    let {tasks} = this.state;
    let index = this.findIndex(id);
    if(index !== -1){
      tasks[index].status = !tasks[index].status;
    }
    this.setState({
      tasks : tasks
    })
    localStorage.setItem('tasks',JSON.stringify(tasks));
    
  };
  onDelete =(id)=>{
    let {tasks} = this.state;
    let index = this.findIndex(id);
    if(index !== -1){
      tasks.splice(index,1);
    }
    this.setState({
      tasks : tasks
    })
    localStorage.setItem('tasks',JSON.stringify(tasks));
    this.closeTaskForm();
  }
  findIndex(id){
    let {tasks} =this.state;
    let result = -1;
    tasks.forEach((task,index)=> {
      if(task.id  === id) 
      {
        result = index;
      }
      
    });
    return result;
    
  }
  render() {
    let {  displayForm } = this.state;
    let elmTaskForm = displayForm ? <TaskForm closeTaskForm={this.closeTaskForm} onSaveTaskForm={this.onSubmit} /> : "";
    return (
      <div className="container">
        <div className="header">
          <h1 className="text-center font-weight-bold text-warning" >Simple Todolist</h1>
          <hr />
        </div>
        <div className="row mt-2">
          {/* TaskForm */}
          <div className={displayForm ? "col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4" : ""}>
            {elmTaskForm}
          </div>
          {/* TaskControl */}
          <div className={displayForm ? "col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8" : "col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"}>
            <button type="button" className="btn btn-primary" onClick={this.openTaskForm}>
              <span className="fas fa-plus-circle mr-1 " > </span>
                Add more work
            </button>
        
            {/* Control */}
            <Control></Control>
            <div className="row mt-1">
              {/* TaskList */}
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <TaskList tasks={this.state.tasks} onUpdateStatus ={this.onUpdateStatus} onDelete={this.onDelete}></TaskList>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

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
      displayForm: false,
      taskEditting: null,
      filter: {
        filterName: '',
        filterStatus: -1
      }
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
    if (this.state.displayForm && this.state.taskEditting !== null) {
      this.setState({
        displayForm: true,
        taskEditting: null
      })
    }
    else {
      this.setState({
        displayForm: !this.state.displayForm,
        taskEditting: null
      });
    }
  }
  closeTaskForm = () => {
    this.setState({
      displayForm: false
      // taskEditting:null
    });
  }
  showTaskForm = () => {
    this.setState({
      displayForm: true

    });
  }
  //handle save taskform
  onSubmit = (data) => {
    console.log(data);
    let { tasks } = this.state;
    if (data.id === "") {
      data.id = this.generateId();
      tasks.push(data);
    } else {
      let index = this.findIndex(data.id);
      tasks[index] = data;
    }
    this.setState({
      tasks: tasks,
      taskEditting: null
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };
  onUpdateStatus = (id) => {
    let { tasks } = this.state;
    let index = this.findIndex(id);
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
    }
    this.setState({
      tasks: tasks
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));

  };
  onDelete = (id) => {
    let { tasks } = this.state;
    let index = this.findIndex(id);
    if (index !== -1) {
      tasks.splice(index, 1);
    }
    this.setState({
      tasks: tasks
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
    if (this.state.displayForm === true) this.closeTaskForm();
  }
  onUpdate = (id) => {
    let { tasks } = this.state;

    let index = this.findIndex(id);
    // console.log(tasks[index]);
    this.setState({
      taskEditting: tasks[index]
    })
    // console.log(this.state.taskEditting);
    // loi dang bi o day
    this.showTaskForm();

  }
  onFilter = (filterName, filterStatus) => {
    // console.log(filterName + '-' + filterStatus);
    // console.log(typeof filterStatus);
    filterStatus = parseInt(filterStatus, 10);
    // console.log(typeof filterStatus);
    this.setState({
      filter: {
        filterName: filterName.toLowerCase(),
        filterStatus: filterStatus
      }
    })

  }
  findIndex(id) {
    let { tasks } = this.state;
    let result = -1;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        result = index;
      }

    });
    return result;

  }

  render() {
    let { taskEditting, tasks, displayForm, filter } = this.state;
    if (filter) {
      if (filter.filterName) {
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(filter.filterName) !== -1;
        });
      }  
      //khac null , khac undefined,khac 0
      tasks = tasks.filter((task) => {
        if (filter.filterStatus === -1) {
          return tasks;
        } else {
          return task.status === (filter.filterStatus === 1 ? true : false);
        }
      })
      // this.setState({
      //   tasks:tasks
      // });
      console.log(tasks);
    }
    let elmTaskForm = displayForm ? <TaskForm
      closeTaskForm={this.closeTaskForm}
      onSaveTaskForm={this.onSubmit}
      task={taskEditting}
    /> : "";
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
              <span className="fas fa-plus-circle mr-1 "></span>
                Add more work
            </button>

            {/* Control */}
            <Control></Control>
            <div className="row mt-1">
              {/* TaskList */}
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <TaskList tasks={tasks} onUpdateStatus={this.onUpdateStatus} onDelete={this.onDelete} onUpdate={this.onUpdate} onFilter={this.onFilter}></TaskList>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

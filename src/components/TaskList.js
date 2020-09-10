import React, { Component } from 'react';

import TaskItem from './TaskItem'
class TaskList extends Component {
    
    render(){
        var {tasks} = this.props; 
        var elmTask = tasks.map((task,index) => {
          return <TaskItem key = {task.id} index = {index} task ={task} onUpdateStatus={this.props.onUpdateStatus} onDelete={this.props.onDelete}></TaskItem>;
        });
        
    return (
        <table className="table table-bordered table-hover  ">
                    <thead className="thead-light">
                      <tr>
                        <th>Number</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td></td>
                        <td>
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              name=""
                            />
                          </div>
                        </td>
                        <td>
                          <div className="form-group">
                            <select
                              className="form-control"
                              name="" >
                              <option value={-1}>All</option>
                              <option value={0}>Active</option>
                              <option value={1}>Unavailable</option>
                            </select>
                          </div>
                        </td>
                        <td></td>
                      </tr>
                        {elmTask}
                    </tbody>
                  </table>
      );
  }
}

export default TaskList;

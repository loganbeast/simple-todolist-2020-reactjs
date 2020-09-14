import React, { Component } from 'react';

import TaskItem from './TaskItem'
class TaskList extends Component {
    constructor(props){
      super(props);
      this.state ={
        filterName : '',
        filterStatus : -1
      };
    }
    onChange=(event) =>{
      let target = event.target;
      let name = target.name;
      let value = target.value;
      this.props.onFilter(
        name === 'filterName'? value:this.state.filterName,
        name==='filterStatus'?value : this.state.filterStatus

      );
      this.setState({
        [name] :value
      })
      
    }
    render(){
        var {tasks} = this.props; 
        var{filterName,filterStatus} = this.state;
        var elmTask = tasks.map((task,index) => {
          return <TaskItem key = {task.id} index = {index} task ={task} onUpdateStatus={this.props.onUpdateStatus} onDelete={this.props.onDelete} onUpdate={this.props.onUpdate}></TaskItem>;
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
                              name="filterName"
                              value={filterName}
                              onChange ={this.onChange}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="form-group">
                            <select
                              className="form-control"
                              name="filterStatus" 
                              value={filterStatus}
                              onChange ={this.onChange}
                              >
                                
                              <option value={-1}>All</option>
                              <option value={1}>Active</option>
                              <option value={0}>Deactive</option>
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

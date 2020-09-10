import React, { Component } from 'react';


class TaskItem extends Component {
    onUpdateStatus =() =>{
        this.props.onUpdateStatus(this.props.task.id);
    }
    onDelete=() =>{
        this.props.onDelete(this.props.task.id);
    }
    render() {
        return (
            <tr>
                <td  className="text-center">{this.props.index +1}</td>
                <td>{this.props.task.name}</td>
                <td className=" text-center">
                    <span 
                    className={this.props.task.status ? "badge badge-success" : "badge badge-danger"}
                    // neu chuyen thang this.props.onUpdateStatus(this.props.task.id) thi chua click no da hien ra id roi
                    onClick={this.onUpdateStatus}
                    >
                        {this.props.task.status ? "Active" : "Hiding"}
                    </span>
                </td>
                <td className="text-center">
                    <button type="submit" className="btn btn-danger mr-1">
                        Edit
                    </button>&nbsp;

                    <button 
                    type="button" 
                    className="btn btn-warning text-white"
                    onClick={this.onDelete}
                    >
                        Delete
                    </button>
                </td>
            </tr>
        );
    }
}

export default TaskItem;

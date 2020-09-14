import React, { Component } from 'react';


class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:"",
            name: "",
            status: false,
            
        }
    }
    componentDidMount(){
        console.log(this.props.task);
        if(this.props.task){
            this.setState({
                name :this.props.task.name,
                status:this.props.task.status,
                id:this.props.task.id
            });
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.task){
            this.setState({
                name :nextProps.task.name,
                status:nextProps.task.status,
                id:nextProps.task.id
            })
        }
        else if(nextProps.task === null){
            this.setState({
                id:"",
                name: "",
                status: false,
                
            });
        }
    }
    onChangeValue = (event) => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        if(name ==="status"){
            value = target.value === 'true' ? true : false;
        }
        this.setState({
            [name]: value
        })
    }
    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSaveTaskForm(this.state);
        this.onClear();
        this.props.closeTaskForm();
    
    }
    onClear = () => {
        this.setState({
            name : "",
            status :false
        })
    }
    render() {
        let {id} = this.state;
        return (
            <div className="card">
                <div className="card-header bg-warning text-danger ">
                    {id !== '' ? "Update work" : "Add more work"}
                  <span className="fas fa-times-circle text-right" onClick={() => { this.props.closeTaskForm() }}></span>
                </div>
                <div className="card-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label >Name :</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                aria-describedby="helpId"
                                placeholder=""
                                value={this.state.name}
                                onChange={this.onChangeValue}
                            />
                        </div>
                        <div className="form-group">
                            <label >Status :</label>
                            <select
                                className="form-control"
                                name="status"
                                onChange={this.onChangeValue}
                                value={this.state.status}
                            >
                                <option value={true}>Active</option>
                                <option value={false}>Hiding</option>
                            </select>
                            <br />
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-danger mr-1">
                                <i className="far fa-plus-square mr-1"></i>
                      Save
                      </button>
                            <button type="button" className="btn btn-warning text-white" onClick={this.onClear}>
                                <i className="far fa-times-circle mr-1  "></i>
                      Delete
                      </button>
                        </div>
                    </form>

                </div>
            </div>
        );
    }
}

export default TaskForm;

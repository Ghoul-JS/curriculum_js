import React, { Component } from 'react';

class App extends Component {

    constructor() {
        super();
        this.state = {
          title: '',
          description: '',
          _id: '',
          tasks: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.addTask = this.addTask.bind(this);
      }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
          [name]: value
        });
    }


    deleteTask(id) {
        if(confirm('Are you sure you want to delete it?')) {
            fetch(`/api/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({html: 'Task Deleted'});
                this.fetchTasks();
            });
        }
    }

    editTask(id) {
        fetch(`/api/tasks/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    title: data.title,
                    description: data.description,
                    _id: data._id   
                })
            });
    }

    addTask(e) {
        if(this.state._id) {
            fetch(`/api/tasks/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({html: 'Task Updated'});
                this.setState({ title: '', description: '', _id: ''});
                this.fetchTasks();
            });
        } else {
            fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    M.toast({html: 'Task saved'});
                    this.setState({title: '', description: ''});
                    this.fetchTasks();
                })
                .catch(err => console.log(err));
        }
        e.preventDefault();
    }

    componentDidMount() {
        this.fetchTasks();
    }

    fetchTasks() {
        fetch('/api/tasks')
          .then(res => res.json())
          .then(data => {
            this.setState({tasks: data});
            console.log(this.state.tasks);
          });
    }
    

    render() {
        return (
            <div>
                {/* NAVIGATION */}
                <nav>
                    <div className="nav-wrapper">
                        <div className='container'>
                            <a href="#" className="brand-logo">MERN stack</a>
                        </div>
                    </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className='col s5'>
                            <div className='card'>
                                <div className='card-content'>
                                    <form className='row' onSubmit={this.addTask}> 
                                        <div className='input-field col s12'>
                                            <input name='title' type="text" placeholder='Task Title' onChange={this.handleChange} value={this.state.title}/>
                                        </div>
                                        <div className='input-field col s12'>
                                            <textarea name='description' className='materialize-textarea' placeholder='Task Description' onChange={this.handleChange} value={this.state.description}></textarea>
                                        </div>
                                        <button className='btn light-blue darken-4'>Send</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className='col s7'>
                            <table>
                                <thead> 
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th> 
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task => {
                                            return (
                                                <tr key={task._id}>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td>
                                                        <button className='btn waves-light red ' onClick={() => this.deleteTask(task._id)}>
                                                            <i className='material-icons'>delete</i>
                                                        </button>
                                                        <button className='btn light-red ' style={{margin: '10px'}} onClick={() => this.editTask(task._id)}> 
                                                            <i className='material-icons'>edit</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
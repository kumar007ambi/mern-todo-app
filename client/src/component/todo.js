import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTodos, deleteTodo, addTodo } from '../actions/todoActions';


class Todo extends Component {
    componentDidMount() {
        this.props.getTodos()
    }
    state = {}
    render() {

        const { todos } = this.props.todo;
        //Onclick Event for Add todo
        const handleAddTodo = (e) => {
            const todo = prompt('Enter Todo Here', '');

            const newTodo = {
                name: todo
            }
            this.props.addTodo(newTodo)
        }
        //Onclick Event for Delete Todo
        const handleDelete = id => {
            this.props.deleteTodo(id)
        }

        const txtStyle = {
            margin: '10px'
        }
        const txtStyle1 = {
            margin: '10px',
            border: '2px solid #ec'
        }
        return (
            <div style={{ ...txtStyle1 }}>
                <Button variant="primary" style={{ ...txtStyle }} onClick={handleAddTodo}>Add Todo</Button>
                <Table hover responsive striped bordered>
                    <tbody>
                        {todos.map((todo) => {
                            return (
                                <tr key={todo._id}>
                                    <td>{todo.name}</td>
                                    <td><Button variant="dark" onClick={
                                        () => handleDelete(todo._id)
                                    }>Delete</Button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        )
    }
}


Todo.propTypes = {
    getTodos: PropTypes.func.isRequired,
    todo: PropTypes.object.isRequired
}


const mapStateToProps = (state) => ({
    todo: state.todo
})

export default connect(mapStateToProps, { getTodos, deleteTodo, addTodo })(Todo);
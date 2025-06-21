import { Formik, useFormik, Form, Field} from "formik";
import { Card, Button, Table } from "react-bootstrap";
import {React, useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalAction from "../../items/modal";
import { useNavigate } from "react-router-dom";
import UpdateTask from "./updateTask";

function getTask(){

    const [showModal, setShowModal] = useState(true);
    const [username, setUsername] = useState("");
    const [tasks, setTasks] = useState([]);
    const [refreshTasks, setRefreshTasks] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [inputUser, setInputUser] = useState("");
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    

    const navigate = useNavigate();

    useEffect(() => {
        if(!showModal){
            fetch (`http://localhost:7080/tasks/getTasksUser?username=${username}`)
            .then((response) => {
               if(response.ok){
                    console.log('ok');
                    return response.json();
                }else{
                    return response.json().then((errorData) => {
                        console.log(errorData.messageError);
                        throw new Error(errorData.messageError);
                    });
                }
            })
            .then((data) => {
                console.log(data.length);
                setTasks(data);
            })
            .catch((error) =>{
                console.log(error);
                alert(error);
            })
            }
        },[refreshTasks]);

    const handleFetch = () => {
        if(username === null || username === ""){
            alert('Username invalid try again')
        }else{
            setRefreshTasks((prev) => !prev);
            setShowModal(false);
            setShowTable(true);
        }

    };

    const formatDate = (dateString) => {
        if(dateString == null){
            return null;
        }
        return new Date(dateString).toLocaleDateString("en-EN", {
            year:"numeric",
            month:"long",
            day:"numeric"
        })
    }

    const confirmDelete=(task) => {
        setSelectedTask(task);
        setShowDelete(true);
    }

    const deleteTask= () => {
        if (selectedTask.username === inputUser) {
            fetch ('http://localhost:7080/tasks/deleteTaskId',  {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id:selectedTask.id}),
            }
        ).then((response) => {
            setTasks(tasks.filter((task) => task.id !== selectedTask.id))
            setShowDelete(false);
            setInputUser("");
            if(response.ok){
                return response.text();
            }else{
                return response.json().then((errorData) => {
                    console.log(errorData.messageError);
                    throw new Error(errorData.messageError); 
                });
            }
            }).then((data) =>{
                alert(data);
                console.log(data);
            }).catch((error) =>{
                console.log(error);
                alert(error);
            })
        }else {
            setInputUser("");
            alert("Username invalid please try again")
        }
    }

    const handleUpdate=(task) => {
        setSelectedTask(task);
        setShowUpdateForm(true);
    }

    const handleClose= ()=>{
        setShowModal(false);
        navigate("/");
    }

    return(
        <>
        <ModalAction 
            showModal={showModal} 
            handleClose={handleClose} 
            handleAction={handleFetch}
            field={username}
            setField={setUsername}
            title={'Get Tasks'}
            message={'Write the username for which you want to get the tasks'}
            typeForm={"text"}
            placeholderForm={"Username"}
            typeButton={"success"}
            textButton={"Get Tasks"}
        />

        <ModalAction 
            showModal={showDelete} 
            handleClose={() => setShowDelete(false)} 
            handleAction={deleteTask}
            field={inputUser}
            setField={setInputUser}
            title={'Delete Task'}
            message={'To confirm that you want to delete the task write the username'}
            typeForm={"text"}
            placeholderForm={"Username"}
            typeButton={"danger"}
            textButton={"Delete"}
        />
    
        {!showUpdateForm ? (
        <Table striped bordered hover hidden={!showTable}>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Due Date</th>
                            <th>Creation Date</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.length > 0 ? (
                        tasks.map((task) => (
                            <tr key={task.id}>
                                <td>{task.username}</td>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td>{task.status ? "Completed" : "In Progress"}</td>
                                <td>{formatDate(task.dueDate)}</td>
                                <td>{formatDate(task.creationDate)}</td>
                                <td>
                                    <Button variant="danger" onClick={() => confirmDelete(task)}>Delete</Button>
                                    <Button variant="warning" onClick={() => handleUpdate(task)}>Update</Button>
                                </td>
                            </tr>
                         ))
                    ) : (
                        <tr>
                            <td colSpan="7" style={{ textAlign: "center" }}>No task for the user: {username}</td>
                        </tr>
                        )}
                    </tbody>
                </Table>
        ):(
            <UpdateTask updateTask={selectedTask} setShowUpdateForm={setShowUpdateForm} setRefreshTasks={setRefreshTasks}></UpdateTask>
        )}
        </>
    );
}
export default getTask;
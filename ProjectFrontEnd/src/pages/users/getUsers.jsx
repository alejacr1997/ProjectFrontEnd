import { Formik, useFormik, Form, Field} from "formik";
import { Card, Button, Table } from "react-bootstrap";
import {React, useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalAction from "../../items/modal";
import UpdateUser from "./updateUser";

function GetUsers(){
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [password, setPassword] = useState("");
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [refreshUsers, setRefreshUsers] = useState(false);

    useEffect(() => {
        fetch ('http://localhost:7080/users/getAllUsers')
        .then((response) => {
           if(response.ok){
                console.log('ok');
                return response.json();
            }else{
                return response.json().then((errorData) => {
                    console.log(errorData.messageError);
                    throw new Error(errorData.messageError); // Extrae el mensaje de error y lo lanza
                });
            }
        })
        .then((data) => {
            console.log(data.length);
            setUsers(data);
        })
        .catch((error) =>{
            console.log(error);
            alert(error);
        })
    },[refreshUsers]);

    const confirmDelete = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    }

    const handleUpdate = (user) => {
        setSelectedUser(user);
        setShowUpdateForm(true);
    }

    const deleteUser = () => {
        if(selectedUser.password === btoa(password)){
            fetch ('http://localhost:7080/users/deleteUser',  {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id:selectedUser.id}),
            }
        ).then((response) => {
            setUsers(users.filter((user) => user.id !== selectedUser.id))
            setShowModal(false);
            setPassword("");
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
            setPassword("");
            alert('Wrong Password');
        }
        
    };

    return(
        <>
            {!showUpdateForm ? (
                <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Username</th>
                    <th>Name</th>
                    <th>Lastname</th>
                    <th>Email</th>
                    <th>Sex</th>
                    <th>Age</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {users.length > 0 ? (
                users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.name}</td>
                        <td>{user.lastname}</td>
                        <td>{user.email}</td>
                        <td>{user.sex}</td>
                        <td>{user.age}</td>
                        <td>
                            <Button variant="danger" onClick={() => confirmDelete(user)}>Delete</Button>
                            <Button variant="warning" onClick={() => handleUpdate(user)}>Update</Button>
                        </td>
                    </tr>
                 ))
            ) : (
                <tr>
                    <td colSpan="8" style={{ textAlign: "center" }}>No hay usuarios disponibles</td>
                </tr>
                )}
            </tbody>
        </Table>
            ):(
                <UpdateUser userUpdate={selectedUser} setShowUpdateForm={setShowUpdateForm} setRefreshUsers={setRefreshUsers}/>
            )
            }
        
        <ModalAction 
            showModal={showModal} 
            handleClose={() => setShowModal(false)} 
            handleAction={deleteUser}
            field={password}
            setField={setPassword}
            title={'Delete User'}
            message={'Are you sure you want to delete the user'}
            typeForm={"password"}
            placeholderForm={"Password"}
            typeButton={"danger"}
            textButton={"Delete"}
        />
        </>
    );

}
export default GetUsers;
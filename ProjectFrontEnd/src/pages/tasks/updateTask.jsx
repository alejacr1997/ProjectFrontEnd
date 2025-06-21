import { Formik, useFormik, Form, Field} from "formik";
import { Card, Button } from "react-bootstrap";
import {React, useEffect, useState, useRef} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CardP from "../../items/card";
import { FaCalendarAlt } from "react-icons/fa";

function UpdateTask({updateTask, setShowUpdateForm, setRefreshTasks}){
    console.log(JSON.stringify(updateTask));
    const validDate = updateTask.dueDate != null ? new Date(updateTask.dueDate).toISOString().split("T")[0] : "";
    const formik = useFormik({
        initialValues: {
            id:updateTask.id,
            title: updateTask.title,
            description:updateTask.description,
            status:updateTask.status,
            dueDate: validDate
        },
         onSubmit: async (values, {resetForm}) => {
            resetForm();
            console.log(JSON.stringify(values));
            values.id = updateTask.id;
            fetch('http://localhost:7080/tasks/updateTask', {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })
                .then((response) => {
                    if(response.ok){
                        return response.text();
                    }else{
                        return response.json().then((errorData) => {
                            console.log(errorData.messageError);
                            throw new Error(errorData.messageError); // Extrae el mensaje de error y lo lanza
                        });
                    }
                    
                }).then((data) =>{
                    alert('Task: '+data+' updated');
                    console.log(data);
                    setRefreshTasks((prev) => !prev);
                    setShowUpdateForm(false);
                }).catch((error) =>{
                    console.log(error);
                    alert(error);
                })
        },validate: values =>{
            let errors = {};
            if (!values.title) {
                errors.title = 'Field required';
            } 
            return errors;
        }
    });
    const today = new Date().toISOString().split("T")[0];
    const dateInputRef = useRef(null)
    let datos = {
        bgcolor:"success",
        txtcolor:"white",
        border:"primary",
        header:"Update Task",
        show: true,
        body:  <> 
            <form onSubmit={formik.handleSubmit}>
                <div>Username:</div>
                <input type="text" className="form-control" id="username" value={updateTask.username} disabled={true}/>
                <div>Title:</div>
                <input type="input" className="form-control" id="title" placeholder="Enter Title" onChange={formik.handleChange} value={formik.values.title}/>
                {formik.errors.title ? <div id="titleError" style={{color:'red',fontWeight:'bold'}}>{formik.errors.title}</div> : null}
                <div>Description:</div>         
                <input type="input" className="form-control" id="description" placeholder="Enter Description" onChange={formik.handleChange} value={formik.values.description}/>
                {formik.errors.description ? <div id="descriptionError" style={{color:'red',fontWeight:'bold'}}>{formik.errors.description}</div> : null}                         
                <div>Status:</div>
                <input type="checkbox" id="status" className="form-check-input" name="status" onChange={formik.handleChange} value={formik.values.status}/>
                {formik.errors.status ? <div id="statusError" style={{color:'red',fontWeight:'bold'}}>{formik.errors.status}</div> : null}
                <div>Due Date:</div>
                <div className="d-flex justify-content-center align-items-center" style={{alignItems:"center"}}>
                <FaCalendarAlt size={20} style={{ marginRight: "8px" , cursor: "pointer"}} onClick={() => dateInputRef.current && dateInputRef.current.showPicker()} />
                <input type="date" className="form-control align-items-center" style={{width: "180px", cursor:"pointer"}} id="dueDate" min={today} ref={dateInputRef} onChange={formik.handleChange} value={formik.values.dueDate}/>
                {formik.errors.dueDate ? <div id="dueDateError" style={{color:'red',fontWeight:'bold'}}>{formik.errors.dueDate}</div> : null} 
                </div>                        
                <hr/>
                 <Button variant="secondary" onClick={() => setShowUpdateForm(false)}>
                    Cancel
                </Button>
                <Button variant="primary" id="submitBtn" type="submit" disabled={!formik.isValid}>Update</Button>
            </form>
            </>
        };
    return (
        <>
       <CardP datos={datos}></CardP>
        </>
    ); 
}
export default UpdateTask;
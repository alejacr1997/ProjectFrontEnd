import { Formik, useFormik, Form, Field} from "formik";
import { Card, Button } from "react-bootstrap";
import {React, useEffect, useState} from 'react';
import UserContext from "../../contexts/userContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import CardP from "../../items/card";

function UpdateUser({userUpdate, setShowUpdateForm, setRefreshUsers}){
    const names = userUpdate.name.split(" ");
    if (names.length == 1){
        names[1]="";
    }
    const formik = useFormik({
        initialValues: {
            id:userUpdate.id,
            firstname: names[0],
            middlename: names[1],
            lastname: userUpdate.lastname,
            username:userUpdate.username,
            email:userUpdate.email,
            sex:userUpdate.sex,
            age:userUpdate.age
        },
         onSubmit: async (values, {resetForm}) => {
            resetForm();
            fetch('http://localhost:7080/users/updateUser', {
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
                            throw new Error(errorData.messageError);
                        });
                    }
                    
                }).then((data) =>{
                    alert('Usuario: '+data+' Updated');
                    console.log(data);
                    setRefreshUsers((prev) => !prev);
                    setShowUpdateForm(false);
                }).catch((error) =>{
                    console.log(error);
                    alert(error);
                })
        },validate: values =>{
            let errors = {};
            if (!values.firstname) {
                errors.firstname = 'Field required';
            } else if (!/^[a-zA-Z]+$/i.test(values.firstname)) {
                errors.firstname = 'Invalid characters';
            }
            if (!values.lastname) {
                errors.lastname = 'Field required';
            } else if (!/^[a-zA-Z]+$/i.test(values.lastname)) {
                errors.lastname = 'Invalid characters';
            }
            if ( values.middlename && !/^[a-zA-Z]+$/i.test(values.middlename)) {
                errors.middlename = 'Invalid characters';
            }
            if (!values.email) {
                errors.email = 'Field required';
            } else if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Write a valid email';
            }
            if (!values.username) {
                errors.username = 'Field required';
            } else if (values.username.length < 8) {
                errors.username = 'Username min length is 8';
            }
            if (!values.id) {
                errors.id = 'Field required';
            } else if (!/^\d+$/i.test(values.id)) {
                errors.id = 'Write a valid id';
            }
            if (!values.age) {
                errors.age = 'Field required';
            } else if (!/^\d+$/i.test(values.age)) {
                errors.age = 'Write a valid age';
            }
            return errors;
        }
    });
   let datos = {
        bgcolor:"success",
        txtcolor:"white",
        border:"primary",
        header:"Update User",
        show: true,
        body:  <> 
            <form onSubmit={formik.handleSubmit}>
                <div>Id:</div>
                <input type="input" className="form-control" id="id" placeholder="Enter Id" onChange={formik.handleChange} value={formik.values.id} disabled={true}/>
                {formik.errors.id ? <div id="idError" style={{color:'red',fontWeight:'bold'}}>{formik.errors.id}</div> : null}
                <div>Firstname:</div>
                <input type="input" className="form-control" id="firstname" placeholder="Enter Firstname" onChange={formik.handleChange} value={formik.values.firstname}/>
                {formik.errors.firstname ? <div id="firstnameError" style={{color:'red',fontWeight:'bold'}}>{formik.errors.firstname}</div> : null}
                <div>Middlename:</div>
                <input type="input" className="form-control" id="middlename" placeholder="Enter Middlename" onChange={formik.handleChange} value={formik.values.middlename}/>
                {formik.errors.middlename ? <div id="middleError" style={{color:'red',fontWeight:'bold'}}>{formik.errors.middlename}</div> : null}
                <div>Lastname:</div>         
                <input type="input" className="form-control" id="lastname" placeholder="Enter Lastname" onChange={formik.handleChange} value={formik.values.lastname}/>
                {formik.errors.lastname ? <div id="lastnameError" style={{color:'red',fontWeight:'bold'}}>{formik.errors.lastname}</div> : null}                         
                <div>Email:</div>
                <input type="input" id="emailField" className="form-control" placeholder="Enter Email" name="email" onChange={formik.handleChange} value={formik.values.email}/>
                {formik.errors.email ? <div id="emailError" style={{color:'red',fontWeight:'bold'}}>{formik.errors.email}</div> : null}
                <div>Username:</div>
                <input type="input" className="form-control" id="username" placeholder="Enter Username" onChange={formik.handleChange} value={formik.values.username} disabled={true}/>
                {formik.errors.username ? <div id="usernameError" style={{color:'red',fontWeight:'bold'}}>{formik.errors.username}</div> : null}         
                <div>Sex:</div>
                <select className="form-control" id="sex" name="sex" onChange={formik.handleChange} value={formik.values.sex}>
                    <option value="N">No answer</option>
                    <option value="F">Female</option>
                    <option value="M">Masculine</option>
                    <option value="O">Other</option>
                </select>
                <div>Age:</div>
                <input type="input" className="form-control" id="age" placeholder="Enter Age" onChange={formik.handleChange} value={formik.values.age}/>
                {formik.errors.age ? <div id="ageError" style={{color:'red',fontWeight:'bold'}}>{formik.errors.age}</div> : null}                  
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
export default UpdateUser;
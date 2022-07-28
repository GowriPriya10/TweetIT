import React, { useState, useContext } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import '../common.css';
import 'bootstrap/dist/css/bootstrap.css';
import Footer from './shared/Footer';
import axios from "axios";
import TweetContext from '../service/TweetContext';

function Register() {

    let navigate = useNavigate();
    const { fetchUserTweets } = useContext(TweetContext);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [error, setError] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [loginIdError, setLoginIdError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [contactNumberError, setContactNumberError] = useState('');


    const changeFirstName = (event) => {
       setFirstName(event.target.value);
    }

    const changeLastName = (event) =>{
        setLastName(event.target.value);
    }

    const changeEmail = (event) => {
        setEmail(event.target.value);
    }

    const changeloginId = (event) => {
        setLoginId(event.target.value);
    }

    const changePassword = (event) => {
        setPassword(event.target.value);
    }

    const changeConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    }

    const changeContact = (event) => {
        setContactNumber(event.target.value);
    }

    const validFirstName = (event) => {
        event.preventDefault();
        if(firstName === ""){
            setFirstNameError("Enter valid First Name");
        }else{
            setFirstNameError("");
        }
    }

    const validLastName = (event) => {
        event.preventDefault();
        if(lastName === ""){
            setLastNameError("Enter valid Last Name");
        }else{
            setLastNameError("");
        }
    }

    const validEmail = (event) => {
        event.preventDefault();
        if(email === ""){
            setEmailError("Enter valid Email Id");
        }else{
            setEmailError("");
        }
    }

    const validLoginId = (event) => {
        event.preventDefault();
        if(loginId === ""){
            setLoginIdError("Enter valid loginID/Username");
        }else{
            setLoginIdError("");
        }
    }

    const validPassword = (event) => {
        event.preventDefault();
        if(password === ""){
            setPasswordError("Enter valid Password");
        }else{
            setPasswordError("");
        }
    }

    const validConfirmPassword = (event) => {
        event.preventDefault();
        if(confirmPassword === "" || confirmPassword !== password){
            setConfirmPasswordError("Passwords don't match");
        }else{
           setConfirmPasswordError("");
        }
    }

    const validContact = (event) => {
        event.preventDefault();
        if(contactNumber === "" || contactNumber.length !== 10){
            setContactNumberError("Enter valid Contact Number");
        }else{
            setContactNumberError("");
        }
    }

    const register = async (event) =>{
        event.preventDefault();
        if(firstName && 
            lastName && 
            email && 
            loginId && 
            password && 
            confirmPassword && 
            contactNumber){
                
            const data = {  firstName: firstName,
                            lastName: lastName,
                            email: email,
                            loginID: loginId,
                            password: password,
                            contactNumber: contactNumber
                        };
            let result;
            try{
                result = await axios({
                    method: 'post',
                    url: 'http://localhost:5000/api/v1.0/tweets/register',
                    data: data,
                    responseType: 'json',
                
                }); 
                console.log(result);
                if(result.data !== undefined){
                    localStorage.setItem('User', JSON.stringify(result.data));
                    fetchUserTweets(result.data.loginID);
                    navigate("/home");
                }else{
                    this.setState({error:"Invalid username or password"});
                }
            }catch(e){
                console.log(e);
                this.setState({error:"Registration Failed!!"});
            }
        }else{
           setError('Please enter all the details');
        }
    }
    

    return (
        <div>
            <div className="modal-dialog modal-login">
                <div className="modal-content">
                {error !== ""?(<div className="alert alert-danger" style={{fontSize: "15px"}}>
                            {error}</div>):""}
                    <div className="modal-header">				
                        <h4 className="modal-title">Register</h4>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={register}>
                            <div className="form-group">
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                    <input type="text" className="form-control" name="firstName" placeholder="FirstName" onChange={changeFirstName} onBlur={validFirstName}/>
                                </div>
                                <div>
                                    <p style={{fontSize: "15px",color: "red"}}>{firstNameError}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                    <input type="text" className="form-control" name="lastName" placeholder="LastName" onChange={changeLastName} onBlur={validLastName}/>
                                </div>
                                <div>
                                    <p style={{fontSize: "15px",color: "red"}}>{lastNameError}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="fa fa-envelope"></i></span>
                                    <input type="email" className="form-control" name="email" placeholder="Email Id" onChange={changeEmail} onBlur={validEmail} required/>
                                </div>
                                <div>
                                    <p style={{fontSize: "15px",color: "red"}}>{emailError}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="fa fa-user-circle"></i></span>
                                    <input type="text" className="form-control" name="loginId" placeholder="LoginId/ Username" onChange={changeloginId} onBlur={validLoginId}/>
                                </div>
                                <div>
                                    <p style={{fontSize: "15px",color: "red"}}>{loginIdError}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                                    <input type="password" className="form-control" name="password" placeholder="Password" onChange={changePassword} onBlur={validPassword}/>
                                </div>
                                <div>
                                    <p style={{fontSize: "15px",color: "red"}}>{passwordError}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                                    <input type="password" className="form-control" name="confirmPassword" placeholder="Confirm Password" onChange={changeConfirmPassword} onBlur={validConfirmPassword}/>
                                </div>
                                <div>
                                    <p style={{fontSize: "15px",color: "red"}}>{confirmPasswordError}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="fa fa-phone"></i></span>
                                    <input type="tel" className="form-control" name="contact" placeholder="Contact Number" onChange={changeContact} onBlur={validContact}/>  
                                </div>
                                <div>
                                    <p style={{fontSize: "15px",color: "red"}}>{contactNumberError}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-block btn-lg">Register</button>
                            </div>
                        </form>
                        <p>Already a member? <Link to="/">Sign In</Link></p> 
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Register;

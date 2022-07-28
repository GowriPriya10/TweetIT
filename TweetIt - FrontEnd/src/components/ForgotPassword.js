import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import '../common.css';
import Footer from './shared/Footer';
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";


function Forgot() {
    let navigate = useNavigate();
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [userNameError, setUserNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const changeName = (event) => {
        setUserName(event.target.value);
    }

    const changePwd = (event) => {
            setPassword(event.target.value);
    }

    const changeConfirmPwd = (event) => {
        setConfirmPassword(event.target.value);
}

    const validMail = (event) => {
        event.preventDefault();
        if(username === ""){
            setUserNameError("Enter valid username");
        }else{
            setUserNameError("");
        }
    }

    const validPwd = (event) => {
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

    const update = async (event) => {
        event.preventDefault();
        if(username && password){
            const data = {password: password};
            // console.log(data);
            // navigate("/");
            let result;
            try{
                result = await axios({
                    method: 'put',
                    url: `http://localhost:5000/api/v1.0/tweets/${username}/forgot`,
                    data: data,
                    responseType: 'json',
                
                }); 
                console.log(result);
                if(result.data !== undefined){ 
                   navigate("/");
                }else{
                    setError("User Not found!!");
                }
            }catch(e){
                console.log(e);
                setError("User Not found!!");
            }
        }else{
            setError("Please enter all the details");
        }
    }

    return (
        <div>
            <div className="modal-dialog modal-login">
                <div className="modal-content">
                {error !== ""?(<div className="alert alert-danger" style={{fontSize: "15px"}}>
                            {error}</div>):""}
                    <div className="modal-header">				
                        <h4 className="modal-title">Forgot Password</h4>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={update}>
                            <div className="form-group">
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                    <input type="text" className="form-control" name="username" placeholder="Username" onChange={changeName} onBlur={validMail}/>
                                </div>
                                <div>
                                    <p style={{fontSize: "15px",color: "red"}}>{userNameError}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                                    <input type="password" className="form-control" name="password" placeholder="Password" onChange={changePwd} onBlur={validPwd}/>
                                </div>
                                <div>
                                    <p style={{fontSize: "15px",color: "red"}}>{passwordError}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                                    <input type="password" className="form-control" name="confirmPassword" placeholder="Confirm Password" onChange={changeConfirmPwd} onBlur={validConfirmPassword}/>
                                </div>
                                <div>
                                    <p style={{fontSize: "15px",color: "red"}}>{confirmPasswordError}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-block btn-lg">Update Password</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Forgot;

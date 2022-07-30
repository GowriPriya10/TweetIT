import React, { useState, useContext } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import '../common.css';
import Footer from './shared/Footer';
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import TweetContext from '../service/TweetContext';


function Login() {

    let navigate = useNavigate();
    const { fetchUserTweets } = useContext(TweetContext);

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [userNameError, setUserNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const changeName = (event) => {
        setUserName(event.target.value);
    }

    const changePwd = (event) => {
            setPassword(event.target.value);
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

    const login = async (event) => {
        event.preventDefault();
        if(username && password){
            const data = {username: username,password: password};
            // console.log(data);
            // localStorage.setItem('User',JSON.stringify(data));
            // navigate("/home");
            let result;
            try{
                result = await axios({
                    method: 'post',
                    url: 'http://localhost:5000/api/v1.0/tweets/login',
                    data: data,
                    responseType: 'json',
                
                }); 
                // console.log(result);
                if(result.data !== undefined){
                    if(result.status === 201) {
                        setError("Invalid username or password");
                    }else{
                        localStorage.setItem('User', JSON.stringify(result.data));
                        fetchUserTweets(result.data.username);
                        navigate("/home");
                    }
                }else{
                    setError("Invalid username or password");
                }
            }catch(e){
                console.log(e);
                setError("Error login, User not found!!");
            }
        }else{
            setError('Please enter the login details');
        }
    }

    return (
        <div>
            <div className="modal-dialog modal-login">
                <center>
                <div className="modal-content">
                {error !== ""?(<div className="alert alert-danger" style={{fontSize: "15px"}}>
                            {error}</div>):""}
                    <div className="modal-header">				
                        <h4 className="modal-title">Sign In</h4>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={login}>
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
                                <button type="submit" className="btn btn-primary btn-block btn-lg">Sign In</button>
                            </div>
                        </form>
                        <Link to="/forgot">Forgot Password?</Link><br/><br/>
                        <p>New to <b>TweetIt App</b>? <Link to="/register">Register Here</Link></p> 
                    </div>
                </div></center>
            </div>
            <Footer />
        </div>
    );
}

export default Login;

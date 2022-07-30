import {useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../common.css';
import { useNavigate } from 'react-router-dom';
import TweetContext from '../../service/TweetContext';

function Header() {

    let user = JSON.parse(localStorage.getItem('User'));
    let navigate = useNavigate();
    const { fetchUserTweets } = useContext(TweetContext);

    const home = () => {
        fetchUserTweets(user.username);
        navigate("/home");
    }

    const users = () => {
        navigate("/users");
    }

    const tweets = () => {
        navigate("/tweets");
    }

    const onLogout = () => {
        localStorage.removeItem('User');
        navigate("/");
    }

    return (
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-tweet">
            <img src={`https://robohash.org/${user.username}/set_set5?size=100x100`} alt="users profile pic" width="50" height="50" className="rounded-circle" />
            <p className="nav-link disabled" style={{ color: "white", marginTop: "5px" }}>{user.username}</p>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item ">
                        <a className="nav-link" onClick={home}>Home<span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={tweets}>Tweets</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={users}>Users</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={onLogout}>LogOut</a>
                    </li>
                </ul>
                <div className="form-inline mt-2 mt-md-0">
                    <h2 style={{ color: 'white', marginRight: '20px'}}>TweetIt</h2>
                </div>
            </div>
        </nav>
    )
}

export default Header;

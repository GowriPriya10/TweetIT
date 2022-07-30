import React, { useState, useContext } from 'react';
import '../common.css';
import 'bootstrap/dist/css/bootstrap.css';
import Footer from './shared/Footer';
import Header from './shared/Header';
import Card from './shared/Card';
import Button from 'react-bootstrap/Button';
import TweetList from './TweetList';
import TweetContext from '../service/TweetContext';

function Home() {
    const user = JSON.parse(localStorage.getItem('User'));

    const { userTweets, postTweet } = useContext(TweetContext);

    const [text, setText] = useState('');
    const [error, setError] = useState('');

    const changeText = (e) => {
        let data = e.target.value;
        if(data.length > 140){
            setError('Tweet length exceeds 140 characters!!');
        }else{
            setText(data);
            setError('');
        }
    }

    const post = () =>{
        if(text.length < 1){
            setError('Tweet cannot be empty');
        }else{
            const data = {text: text};
            postTweet(user.username,data);
            setText('');
        }
    }

    return (
        <div >
            <Header />
            <div style={{ margin: "100px" }}>
                <Card>
                    {error !== "" ? (<div className="alert alert-danger" style={{fontSize: "15px"}}>
                            {error}</div>):""}
                    <div className="row">
                        <div className="column">
                            <div className="row">
                                <div>
                                    <textarea name="tweet" rows="4" cols="50" value={text} onChange={changeText} />
                                </div>
                                <div>
                                    <Button variant="outline-success" style={{ marginLeft: '10em' }} onClick={post}>TweetIt</Button>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <TweetList tweets = {userTweets}/>
                        </div>
                    </div>
                </Card>
            </div>
            <Footer />
        </div>
    );
}

export default Home;

import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { get } from 'lodash';

const TweetContext = createContext();

export const TweetProvider = ({ children }) => {

    const user = JSON.parse(localStorage.getItem('User'));

    const [tweets, setTweets] = useState([])
    const [userTweets, setUserTweets] = useState([])

    const fetch = () => {
        fetchTweets();
        fetchUserTweets(get(user,'loginID',''));
    }


    useEffect(() => {
        fetch();
    }, [])

    // Fetch Tweets
    const fetchTweets = () => {
        axios('http://localhost:5000/api/v1.0/tweets/all')
            .then(response => {
                // console.log(response.data)
                setTweets(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    //fetch loggedIn user tweets
    const fetchUserTweets = (username) =>{
        axios.get(`http://localhost:5000/api/v1.0/tweets/${username}`)
            .then(res => {
                setUserTweets([...res.data]);
            }).catch( err => {
                console.log(err);
        })
    }

    //post tweet
    const postTweet = (username, data) => {
        axios.post(`http://localhost:5000/api/v1.0/tweets/${username}/add`,data)
            .then(response =>{
                if(response.status === 200){
                    fetch();
                }
            }).catch( err => {
                console.log(err);
        })
    }

    //like tweet
    const likeTweet = (username, id) => {
        axios.put(`http://localhost:5000/api/v1.0/tweets/${username}/like/${id}`)
        .then(response => {
            if(response.status === 200){
                fetch();
            }
        })
        .catch(error => {
            console.log(error);
        })
    }

    //delete tweet
    const deleteTweet = (username, id) => {
        axios.delete(`http://localhost:5000/api/v1.0/tweets/${username}/delete/${id}`)
        .then(response => {
            if(response.status === 200){
                fetch();
            }
        })
        .catch(error => {
            console.log(error);
        })
    }

    //update tweet
    const updateTweet = (username, id, data) => {
        axios.put(`http://localhost:5000/api/v1.0/tweets/${username}/update/${id}`,data)
        .then(response => {
            if(response.status === 200){
                fetch();
            }
        })
        .catch(error => {
            console.log(error);
        })
    }

    //reply to the tweets
    const replyTweet = (username, id, data) => {
        axios.post(`http://localhost:5000/api/v1.0/tweets/${username}/reply/${id}`,data)
        .then(response => {
            if(response.status === 200){
                fetch();
            }
        })
        .catch(error => {
            console.log(error);
        })
    }

    return (
        <TweetContext.Provider
            value={{
                tweets,
                userTweets,
                postTweet,
                fetchUserTweets,
                likeTweet,
                deleteTweet,
                updateTweet,
                replyTweet
            }}>
            {children}
        </TweetContext.Provider>
    )
}

export default TweetContext;

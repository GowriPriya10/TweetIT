import React from 'react';
import TweetCard from './TweetCard';

function TweetList({tweets}){
    return(
        tweets.length > 0 && tweets.map((item) => {
            return (
                <TweetCard item={item} />
            )
        })
    )
}

export default TweetList;

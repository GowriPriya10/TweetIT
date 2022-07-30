import React from 'react';

function RepliesList({ tweets }) {
    return (
        tweets.map((item) => {
            return (
                <div className="tweet-body" style={{height: '150px'}}>
                    <div className="inner-body">
                        <img src={`https://robohash.org/${item.username}/set_set5?size=100x100`} alt="Logo" className="picture" />
                        <div className="body">
                            <div className="inner-body">
                                <div className="name"> <b>@{item.username}</b> </div>
                                <div className="name">{item.time}</div>
                            </div>
                            <div className="tweet"> {item.text}</div>
                        </div>
                    </div>
                </div>
            )
        })
    )
}

export default RepliesList;

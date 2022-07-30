import React, { useContext } from 'react';
import '../common.css';
import 'bootstrap/dist/css/bootstrap.css';
import Card from './shared/Card';
import Footer from './shared/Footer';
import Header from './shared/Header';
import TweetList from './TweetList';
import TweetContext from '../service/TweetContext';


function Tweet() {

    const { tweets } = useContext(TweetContext);

    return (
        <div >
            <Header />
            <div style={{ margin: "100px" }}>
                <h2>All Tweets</h2>
                <div style={{ margin: "50px 150px 50px 150px" }}>
                    <Card>
                        <TweetList tweets = {[...tweets]}/>
                    </Card>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Tweet;

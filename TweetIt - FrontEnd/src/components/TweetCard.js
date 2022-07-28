import React, { useState, useContext } from 'react';
import '../common.css';
import 'bootstrap/dist/css/bootstrap.css';
import TweetContext from '../service/TweetContext';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import RepliesList from './RepliesList';

function TweetCard({ item }) {

    const user = JSON.parse(localStorage.getItem('User'));

    const [text, setText] = useState('');
    const [showReplyModal, setShowReplyModal] = useState(false);
    const [showRepliesModal, setShowRepliesModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);


    const { likeTweet, deleteTweet, replyTweet, updateTweet } = useContext(TweetContext);

    const like = () => {
        likeTweet(user.loginID, item._id);
    }

    const reply = () => {
        replyTweet(user.loginID, item._id, { text: text })
        setText('');
        setShowReplyModal(false);
    }

    const edit = () => {
        updateTweet(user.loginID, item._id, { text: text })
        setText('');
        setShowEditModal(false);
    }

    const del = () => {
        deleteTweet(user.loginID, item._id);
    }
    console.log(item);
    return (
        <div className="tweet-body">
            <div className="inner-body">
                <img src={`https://robohash.org/${item.username}/set_set5?size=100x100`} alt="Logo" className="picture" />
                <div className="body">
                    <div className="inner-body">
                        <div className="name"> <b>@{item.username}</b> </div>
                        <div className="name">{item.time}</div>
                    </div>
                    <div className="tweet"> {item.text}</div>
                    <div>
                        <i className="fa fa-thumbs-up reply" onClick={like} /> {item.likes.length}

                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        <span className="reply"><i className="fa fa-reply" onClick={() => setShowReplyModal(true)}> Reply</i></span>
                        {<Modal show={showReplyModal} onHide={() => setShowReplyModal(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Reply to tweet</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div>
                                    <textarea name="tweet" rows="4" cols="50" value={text} onChange={(e) => { setText(e.target.value) }} />
                                </div>
                                <div>
                                    <Button variant="outline-success" style={{ marginLeft: '10em' }} onClick={reply}>Reply</Button>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="success" onClick={() => setShowReplyModal(false)}>
                                    Close
                            </Button>
                            </Modal.Footer>
                        </Modal>}


                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        <span className="reply"><i className="fa fa-comment" onClick={() => setShowRepliesModal(true)}> Replies</i></span>
                        {<Modal show={showRepliesModal} onHide={() => setShowRepliesModal(false)} dialogClassName="modal-90w">
                            <Modal.Header closeButton>
                                <Modal.Title>Replies to tweet</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {item.replies.length > 0 ? <RepliesList tweets = {item.replies} /> : <p>No replies yet!!</p>}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="success" onClick={() => setShowRepliesModal(false)}>
                                    Close
                            </Button>
                            </Modal.Footer>
                        </Modal>}


                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        {item.username === user.loginID && <span className="reply" onClick={() => setShowEditModal(true)}><i className="fa fa-edit"> Edit</i></span>}
                        {<Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit your tweet</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div>
                                    <textarea name="tweet" rows="4" cols="50" value={text} onChange={(e) => { setText(e.target.value) }} />
                                </div>
                                <div>
                                    <Button variant="outline-success" style={{ marginLeft: '10em' }} onClick={edit}>Edit</Button>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="success" onClick={() => setShowEditModal(false)}>
                                    Close
                            </Button>
                            </Modal.Footer>
                        </Modal>}


                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        {item.username === user.loginID && <span className="reply" onClick={del}><i className="fa fa-trash"> Delete</i></span>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TweetCard;

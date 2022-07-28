import React, { useEffect, useState } from 'react';
import '../common.css';
import 'bootstrap/dist/css/bootstrap.css';
import InputGroup from "react-bootstrap/InputGroup";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Card from './shared/Card';
import Footer from './shared/Footer';
import Header from './shared/Header';
import axios from 'axios';


function User() {

    const [users, setUsers] = useState([]);
    const [filteredData, setFilteredData] = useState(users);

    const handleSearch = (event) => {
        let value = event.target.value.toLowerCase();
        let result = [];
        result = users.filter((data) => {
            return data.loginID.search(value) !== -1;
        });
        setFilteredData(result);
    }

    useEffect(() => {
        axios('http://localhost:5000/api/v1.0/tweets/users/all')
            .then(response => {
                // console.log(response.data)
                setUsers(response.data);
                setFilteredData(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

   return (
        <div >
            <Header />
            <div style={{ margin: "100px" }}>
                <h2>All Users</h2>
                <div>
                    <InputGroup className="col-6">
                        <input type="text" className="form-control" name="username" placeholder="Search by Username" onChange={(event) => handleSearch(event)} />
                    </InputGroup>
                </div>
                <Row xs={1} md={2} className="g-3">
                    {filteredData.length > 0 && filteredData.map((item, index) => {
                        return (
                            <Col key={index}>
                                <Card>
                                    <div className="flex">
                                        <div>
                                            <img src={`https://robohash.org/${item.loginID}/set_set5?size=100x100`} alt={`${item.firstname} ${item.lastname}'s Profile Pic`} style={{ minWidth: '100px', maxWidth: '100px', maxHeight: "100px", minHeight: "100px", borderRadius: "50%", padding: "10px", alignSelf: "center" }} />
                                        </div>
                                        <div>
                                            <b>First Name: </b> {item.firstName} <br />
                                            <b>Last Name: </b> {item.lastName} <br />
                                            <b>UserName: </b> {item.loginID} <br />
                                            <b>Email ID:</b> {item.email} <br />
                                            <b>Contact Number: </b> {item.contactNumber}
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </div>
            <Footer />
        </div>
    );
}

export default User;

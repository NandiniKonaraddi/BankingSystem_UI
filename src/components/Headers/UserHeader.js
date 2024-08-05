
import { Button, Container, Row, Col } from "reactstrap";
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
const UserHeader = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const getTokenFromLocalStorage = () => {
      const token = localStorage.getItem('token');
      if (token) {
        setUsername(jwtDecode(token));

      } else {
        console.log('Token not found in localStorage');
      }
    };
    getTokenFromLocalStorage();
  }, []);
  return (

    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "600px",
          backgroundImage:
            "url(" + require("../../assets/img/theme/profile-cover.jpg") + ")",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >

        <span className="mask bg-gradient-default opacity-8" />

        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white">{username.username}</h1>
              <p className="text-white mt-0 mb-5">
               Hello {username.username} This is your profile page. You can see the progress you've made
                with your Account
              </p>
              {/* <Button
                color="info"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                Edit profile
              </Button> */}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default UserHeader;

import React, { useState, useEffect } from "react";
import "./About.css";
import Heading from '../../components/Heading/Heading';
import { Container, Row, Col } from "react-bootstrap";
import { TelephoneFill, EnvelopeFill } from "react-bootstrap-icons";
import { db } from "../../firebase";
import { onValue, ref } from "firebase/database";

function About() {
    const [about, updateAbout] = useState('');

    useEffect(() => {
        const query = ref(db, "About");
        return onValue(query, (snapshot) => {
          const data = snapshot.val();
          updateAbout(data);
        });
      }, []);

    return (
        <div>
            <Heading choice="about" />
            <Container className="aboutContent">
                <p className="pageTitle">ABOUT US</p>
                <Row>
                    <Col>
                        <img src={require("../../img/boatpainting.jpg")} alt="about" className="aboutPic" />
                    </Col>
                    <Col>
                        <p>{about?.Description}</p>
                        <p className="contactBody"><b>Contact us</b><br />
                        <TelephoneFill />   {about?.Phone}<br />
                        <EnvelopeFill />   {about?.Email}</p>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default About;
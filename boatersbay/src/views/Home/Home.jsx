import './Home.css';
import React from "react";
import { Button } from 'react-bootstrap';
import Heading from '../../components/Heading/Heading';

export function Home() {
    return <div className="home">
        <Heading />
        <div className='homeContent'>
            <h3 className='homeTitle'>Your one-stop shop for all<br />your general boat maintenance needs!</h3>
            <div className='buttonGroup'>
                <Button variant="light" className='button' href='/products'>SHOP NOW {">>"}</Button>
            </div>
        </div>
    </div>
}
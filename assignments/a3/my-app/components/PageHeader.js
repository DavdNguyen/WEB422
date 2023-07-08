import React from 'react';
import Card from 'react-bootstrap/Card';

export default function PageHeader({text}) {
    return (
        <>
            <Card className='bg-light'>
                <Card.Body>
                    <strong>{text}</strong>
                </Card.Body>
            </Card>
            <br></br>
        </>
    )
};
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default function MovieDetails({ movie }) {
    return (
        <>
            <Container>
                <Row>
                    { movie.poster && <Col md><img src={movie.poster} alt="poster" className="w-100" /><br /><br /></Col> }
                    <Col md>
                        <strong>Directed By: </strong>{ movie.directors.join(', ') }<br /><br />
                        <p>{ movie.fullplot }</p>
                        <strong>Cast: </strong>{ movie.cast.join(', ') }<br /><br />
                        <strong>Awards: </strong>{ movie.awards.text }<br />
                        <strong>IMDB Rating: </strong> { movie.imdb.rating } ({ movie.imdb.votes })
                    </Col>
                </Row>
            </Container>
        </>
    )
}

import React, { useEffect, useState } from "react";
import {useAtom} from "jotai";
import {favouritesAtom} from "@/store";
import ArtworkCard from "@/components/ArtworkCard";
import {Container, Row, Col, Card} from "react-bootstrap";

export default function Favourites() {
    const [favouritesList] = useAtom(favouritesAtom);
    if(!favouritesList) return null;
  
    return (
        <>
            <Container>
                {favouritesList.length > 0 ? 
                // if you have favourites
                (
                    <Row className="gy-4">
                        {favouritesList.map((itemObjectID) => (
                            <Col lg={3} key={itemObjectID}>
                                <ArtworkCard objectID={itemObjectID} />
                            </Col>
                        ))}
                    </Row>
                ) : 
                // if favourtes empty
                (
                    <Card>
                        <Card.Body>
                            <h1>Nothing Here</h1>                       
                            <p>Try adding some new artwork to this list.</p>
                        </Card.Body>
                    </Card>
                )}
            </Container>
        </>
    );
  }
  
import React from "react";
import useSWR from "swr";
import Error from "next/error";
import Card from "react-bootstrap/Card";
import Link from "next/link";
import { Button } from "react-bootstrap";

export default function ArtworkCard({objectID}) {
    const {data, err} = useSWR(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
    );

    if (err) {
        return <Error statusCode={404} />;
    } else {
        if (
            !data ||
            data.length === 0 ||
            data.message === "Not a valid object"
        ) {
            return null;
        } else {
            return (
                <Card style={{width: "18rem"}} className="w-100">

                    {data.primaryImageSmall ? 
                        // if img prop exists
                        <Card.Img
                            variant="top"
                            src={data.primaryImageSmall}
                        />
                     : 
                        // if no img property
                        <Card.Img
                            variant="top"
                            src="https://via.placeholder.com/375x375.png?text=[+Not+Available+]"
                        />
                    }

                    <Card.Body>
                        {data.title ? <Card.Title>{data.title}</Card.Title> : <Card.Title>N/A</Card.Title>}
                        <Card.Text>
                            {data.objectDate ? <p><strong>Date: </strong>{data.objectDate}</p> : <p>N/A</p> }
                            {data.classification ? <p><strong>Classification: </strong>{data.classification}</p> : <p>N/A</p> }
                            {data.medium ? <p><strong>Medium: </strong>{data.medium}</p> : <p>N/A</p> }
                        </Card.Text>
                        <Link passHref legacyBehavior href={`/artwork/${objectID}`}>
                            <Button variant="outline-dark"><strong>ID: </strong>{ objectID }</Button>
                        </Link>
                    </Card.Body>
                    
                </Card>
            );
        }
    }
}

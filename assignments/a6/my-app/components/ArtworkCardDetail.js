import React, {useState} from "react";
import useSWR from "swr";
import {Button, Card} from "react-bootstrap";
import Error from "next/error";
import {useAtom} from "jotai";
import {favouritesAtom} from "@/store";
import { addToFavourites, removeFromFavourites } from "@/lib/userData";
import { useEffect } from "react";

export default function ArtworkCardDetail({objectID}) {
    const {data, err} = useSWR(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
    );

    const [favourites, setFavourites] = useAtom(favouritesAtom);

    const [showAdded, setShowAdded] = useState(false);

    useEffect(()=>{ 
        setShowAdded(favourites?.includes(objectID)) }, [favourites, objectID]) 
    

    const favouritesClicked = async () => {
        if (showAdded) {
            // remove the artwork from favourites
            setFavourites(
                await removeFromFavourites(objectID)
            );
        } else {
            // add artwork to favourites
            setFavourites(await addToFavourites(objectID));
        }
    };

    if (err) {
        return <Error statusCode={404} />;
    } else {
        if (!data || data.length === 0) {
            return null;
        } else {
            return (
                <Card style={{width: "18rem"}}>
                    {data.primaryImageSmall && (
                        <Card.Img variant="top" src={data.primaryImage} />
                    )}

                    <Card.Body>
                        {data.title ? (
                            <Card.Title>{data.title}</Card.Title>
                        ) : (
                            <Card.Title>N/A</Card.Title>
                        )}

                        <Card.Text>
                            {data.objectDate ? (
                                <p>{data.objectDate}</p>
                            ) : (
                                <p>N/A</p>
                            )}
                            {data.classification ? (
                                <p>{data.classification}</p>
                            ) : (
                                <p>N/A</p>
                            )}
                            {data.medium ? <p>{data.medium}</p> : <p>N/A</p>}
                            <br />
                            <br />
                            {data.artistDisplayName ? (
                                <span>
                                    <p>{data.artistDisplayName}</p>
                                    <p>
                                        <a
                                            href={data.artistWikidata_URL}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            wiki
                                        </a>
                                    </p>
                                </span>
                            ) : (
                                <p>N/A</p>
                            )}
                            {data.creditLine ? (
                                <p>{data.creditLine}</p>
                            ) : (
                                <p>N/A</p>
                            )}
                            {data.dimensions ? (
                                <p>{data.dimensions}</p>
                            ) : (
                                <p>N/A</p>
                            )}
                        </Card.Text>

                        <Button
                            variant='outline-dark'
                            onClick={favouritesClicked}
                        >
                            {showAdded ? "+ Favourite (added)" : "+ Favourite"}
                        </Button>
                    </Card.Body>
                </Card>
            );
        }
    }
}

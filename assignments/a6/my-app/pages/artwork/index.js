import React, {useState, useEffect} from "react";
import {useRouter} from "next/router";
import useSWR from "swr";
import {Row, Col, Pagination, Card} from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";
import Error from "next/error";
import validObjectIDList from "@/public/data/validObjectIDList";

const PER_PAGE = 12;

export default function ArtworkHome() {
    const [artworkList, setArtworkList] = useState(null);
    const [page, setPage] = useState(1);

    const router = useRouter();
    let finalQuery = router.asPath.split("?")[1];

    const {data, error} = useSWR(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`
    );

    const previousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const nextPage = () => {
        if (page < artworkList.length) {
            setPage(page + 1);
        }
    };

    useEffect(() => {
        if (data) {
            let filteredResults = validObjectIDList.objectIDs.filter((x) =>
                data.objectIDs?.includes(x)
            );
            const results = [];
            for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
                const chunk = filteredResults.slice(i, i + PER_PAGE);
                results.push(chunk);
            }
            setArtworkList(results);
            setPage(1);
        }
    }, [data]);

    if (error) {
        return <Error statusCode={404} />;
    }

    if (artworkList === null) {
        return null;
    }

    if (artworkList.length === 0) {
        return (
            <Col>
                <Card>
                    <Card.Body>
                        <h4>Nothing Here</h4>
                        Try searching for something else.
                    </Card.Body>
                </Card>
            </Col>
        );
    }

    const currentPageArtwork = artworkList[page - 1];

    return (
        <>
            <Row className="gy-4">
                {currentPageArtwork.map((currentObjectID) => (
                    <Col lg={3} key={currentObjectID}>
                        <ArtworkCard objectID={currentObjectID} />
                    </Col>
                ))}
            </Row>
            <Row className="justify-content-center mt-4">
                <Col>
                    <Pagination>
                        <Pagination.Prev onClick={previousPage} />
                        <Pagination.Item>{page}</Pagination.Item>
                        <Pagination.Next onClick={nextPage} />
                    </Pagination>
                </Col>
            </Row>
        </>
    );
}

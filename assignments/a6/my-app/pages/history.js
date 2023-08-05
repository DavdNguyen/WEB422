import React from "react";
import {useAtom} from "jotai";
import {searchHistoryAtom} from "@/store";
import {useRouter} from "next/router";
import {Card, ListGroup, Container} from "react-bootstrap";
import styles from "@/styles/History.module.css";
import {Button} from "react-bootstrap";
import { removeFromHistory } from "@/lib/userData";

export default function History() {
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const router = useRouter();

    if (!searchHistory) return null;

    let parsedHistory = [];
    searchHistory.forEach((h) => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    });

    const historyClicked = (e, index) => {
        router.push(`/artwork?${searchHistory[index]}`);
    };

    const removeHistoryClicked = async (e, index) => {
        e.stopPropagation(); // stop the event from triggering other events
        setSearchHistory(await removeFromHistory(searchHistory[index]));
    };

    return (
        <>
            <Container>
                {parsedHistory.length > 0 ? (
                    <ListGroup>
                        {parsedHistory.map((historyItem, index) => (
                            <ListGroup.Item
                                key={index}
                                className={styles.historyListItem}
                                onClick={(e) => historyClicked(e, index)}
                            >
                                {Object.keys(historyItem).map((key) => (
                                    <React.Fragment key={key}>
                                        {key}:{" "}
                                        <strong>{historyItem[key]}</strong>
                                        &nbsp;
                                    </React.Fragment>
                                ))}
                                <Button
                                    className="float-end"
                                    variant="danger"
                                    size="sm"
                                    onClick={(e) =>
                                        removeHistoryClicked(e, index)
                                    }
                                >
                                    &times;
                                </Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                ) : (
                    <Card>
                        <Card.Body>
                            <h1>Nothing Here</h1>
                            <p>Try searching for some artwork.</p>
                        </Card.Body>
                    </Card>
                )}
            </Container>
        </>
    );
}

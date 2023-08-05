import React from "react";
import {Form, Row, Col, Button} from "react-bootstrap";
import {useRouter} from "next/router";
import {useForm} from "react-hook-form";
import { Atom, useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { addToHistory } from "@/lib/userData";

export default function AdvancedSearch() {

    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues: {
            searchQuery: "",
            searchBy: "title",
            geoLocation: "",
            medium: "",
            isOnView: false,
            isHighlight: false,
        },
    });

    const router = useRouter();

    const submitForm = async (data) => {
        let queryString = "";

        if (data.searchBy === "tags") {
            queryString += "tags=true";
        } else if (data.searchBy === "artistOrCulture") {
            queryString += "artistOrCulture=true";
        } else {
            queryString += "title=true";
        }

        if (data.geoLocation) {
            queryString += `&geoLocation=${data.geoLocation}`;
        }

        if (data.medium) {
            queryString += `&medium=${data.medium}`;
        }

        queryString += `&isOnView=${data.isOnView || "false"}`;
        queryString += `&isHighlight=${data.isHighlight || "false"}`;
        queryString += `&q=${data.searchQuery}`;

        setSearchHistory(await addToHistory(queryString))  
        router.push(`/artwork?${queryString}`);
    };

    return (
        <>
            <Form onSubmit={handleSubmit(submitForm)}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Search Query</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=""
                                name="q"
                                {...register("searchQuery", {required: true})}
                                className={
                                    errors.searchQuery ? "is-invalid" : ""
                                }
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Form.Label>Search By</Form.Label>
                        <Form.Select
                            name="searchBy"
                            className="mb-3"
                            defaultValue="title"
                            {...register("searchBy")}
                        >
                            <option value="title">Title</option>
                            <option value="tags">Tags</option>
                            <option value="artistOrCulture">
                                Artist or Culture
                            </option>
                        </Form.Select>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Geo Location</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=""
                                name="geoLocation"
                                {...register("geoLocation")}
                            />
                            <Form.Text className="text-muted">
                                Case Sensitive String (ie "Europe", "France",
                                "Paris", "China", "New York", etc.), with
                                multiple values separated by the | operator
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Medium</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=""
                                name="medium"
                                {...register("medium")}
                            />
                            <Form.Text className="text-muted">
                                Case Sensitive String (ie: "Ceramics",
                                "Furniture", "Paintings", "Sculpture",
                                "Textiles", etc.), with multiple values
                                separated by the | operator
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check
                            type="checkbox"
                            label="Highlighted"
                            name="isHighlight"
                            {...register("isHighlight")}
                        />
                        <Form.Check
                            type="checkbox"
                            label="Currently on View"
                            name="isOnView"
                            {...register("isOnView")}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <br />
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
}

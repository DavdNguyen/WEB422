import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import {useRouter} from "next/router";

export default function MainNav() {
    const router = useRouter();
    const [searchField, setSearchField] = useState("");

    const submitSearch = (e) => {
        e.preventDefault();
        router.push(`/artwork?title=true&q=${searchField}`);
        setSearchField("");
    };

    return (
        <>
            <Navbar className="bg-dark navbar-dark fixed-top nav-bar">
                <Container>
                    <Navbar.Collapse>
                        <Navbar.Brand>David Nguyen</Navbar.Brand>
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{maxHeight: "100px"}}
                            navbarScroll
                        >
                            <Link href="/" passHref legacyBehavior>
                                <Nav.Link>Home</Nav.Link>
                            </Link>
                            <Link href="/search" passHref legacyBehavior>
                                <Nav.Link>Advanced Search</Nav.Link>
                            </Link>
                        </Nav>

                        <Form className="d-flex" onSubmit={submitSearch}>
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                value={searchField}
                                onChange={(e) => setSearchField(e.target.value)}
                                className="me-2"
                            />
                            <Button variant="success" type="submit">
                                Search
                            </Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br />
            <br />
        </>
    );
}

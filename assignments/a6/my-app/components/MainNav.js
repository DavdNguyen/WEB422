import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import { useRouter } from "next/router";
import { NavDropdown } from "react-bootstrap";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { addToHistory } from "@/lib/userData";
import { readToken, removeToken } from "@/lib/authenticate";

export default function MainNav() {
    const router = useRouter();
    const [searchField, setSearchField] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    let token = readToken();

    const toggleNavbar = () => {
        setIsExpanded(!isExpanded);
    };

    const submitSearch = async (e) => {
        e.preventDefault();
        router.push(`/artwork?title=true&q=${searchField}`);
        setSearchField("");
        setIsExpanded(false);

        // store the query in search history
        const queryString = `title=true&q=${searchField}`;
        setSearchHistory(await addToHistory(`title=true&q=${searchField}`))
    };

    const handleNavLinkClick = () => {
        setIsExpanded(false);
    };

    const logout = () => {
        removeToken();
        router.push("/login");
    };

    return (
        <div>
            <Navbar
                expand="lg"
                className="bg-dark navbar-dark fixed-top nav-bar"
                expanded={isExpanded}
            >
                <Container>
                    <Navbar.Brand>David Nguyen</Navbar.Brand>
                    <Navbar.Toggle
                        aria-controls="navbarScroll"
                        onClick={toggleNavbar}
                    />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: "100px" }}
                            navbarScroll
                        >
                            <Link href="/" passHref legacyBehavior>
                                <Nav.Link
                                    active={router.pathname === "/"}
                                    onClick={handleNavLinkClick}
                                >
                                    Home
                                </Nav.Link>
                            </Link>
                            {token && (
                                <Link href="/search" passHref legacyBehavior>
                                    <Nav.Link
                                        active={router.pathname === "/search"}
                                        onClick={handleNavLinkClick}
                                    >
                                        Advanced Search
                                    </Nav.Link>
                                </Link>
                            )}
                        </Nav>

                        {token && (
                            <Form className="d-flex" onSubmit={submitSearch}>
                                <Form.Control
                                    type="text"
                                    placeholder="Search"
                                    value={searchField}
                                    onChange={(e) =>
                                        setSearchField(e.target.value)
                                    }
                                    className="me-2"
                                />
                                <Button variant="success" type="submit">
                                    Search
                                </Button>
                            </Form>
                        )}

                        {token ? (
                            <Nav className="ms-auto" navbarScroll>
                                <NavDropdown
                                    title={`Welcome ${token.userName}`}
                                    id="userNameDropdown"
                                    active={
                                        router.pathname === "/favourites" ||
                                        router.pathname === "/history"
                                    }
                                >
                                    <Link href="/favourites" passHref>
                                        <NavDropdown.Item
                                            onClick={() => {
                                                setIsExpanded(false);
                                                router.push("/favourites");
                                            }}
                                        >
                                            Favourites
                                        </NavDropdown.Item>
                                    </Link>

                                    <Link href="/history" passHref>
                                        <NavDropdown.Item
                                            onClick={() => {
                                                setIsExpanded(false);
                                                router.push("/history");
                                            }}
                                        >
                                            Search History
                                        </NavDropdown.Item>
                                    </Link>
                                    <NavDropdown.Item onClick={logout}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        ) : (
                            <Nav className="ms-auto" navbarScroll>
                                <Link href="/login" passHref legacyBehavior>
                                    <Nav.Link
                                        active={router.pathname === "/login"}
                                        onClick={handleNavLinkClick}
                                    >
                                        Login
                                    </Nav.Link>
                                </Link>
                                <Link href="/register" passHref legacyBehavior>
                                    <Nav.Link
                                        active={router.pathname === "/register"}
                                        onClick={handleNavLinkClick}
                                    >
                                        Register
                                    </Nav.Link>
                                </Link>
                            </Nav>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div style={{ paddingTop: "50px" }}></div>
        </div>
    );
}

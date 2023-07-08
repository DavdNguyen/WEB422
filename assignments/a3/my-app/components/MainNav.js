export default function MainNav() {
    return (
        <>
            <Navbar className="fixed-top navbar-dark bg-dark">
                <Container>
                    <Navbar.Brand>David Nguyen</Navbar.Brand>
                    <Nav className="me-auto">
                        <Link href="/" passHref legacyBehavior>
                            <Nav.Link>Movies</Nav.Link>
                        </Link>
                        <Link href="/about" passHref legacyBehavior>
                            <Nav.Link>About</Nav.Link>
                        </Link>
                    </Nav>
                </Container>
            </Navbar>
            <br></br>
            <br></br>
        </>
    );
}

import React from "react";
import Link from "next/link";
import Card from "react-bootstrap/Card";
import MovieDetails from "@/components/MovieDetails";
import PageHeader from "@/components/PageHeader";

export function getStaticProps() {
    return new Promise((resolve, reject) => {
        fetch(
            "https://tough-pig-tiara.cyclic.app/api/movies/573a139af29313caabcf0859"
        )
            .then((res) => res.json())
            .then((data) => {
                resolve({props: {movie: data}});
            })
            .catch((err) => {
                reject(err);
            });
    });
}

export default function About({movie}) {
    return (
        <>
            <PageHeader text="About the Developer" />
            <Card>
                <Card.Body>
                    My name is David Nguyen and I am currently taking the
                    Computer Programming and Analysis program at Seneca College.
                    <br />
                    My goal is to become a full-stack developer in the future.{" "}
                    <br /><br />
                    Check out this movie:{' '}
                    <Link href="/movies/Dark City" legacyBehavior>
                        Dark City
                    </Link>
                    <br />
                </Card.Body>
                <MovieDetails movie={movie} />
            </Card>
        </>
    );
}

/*********************************************************************************
*  WEB422 – Assignment 3
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: David Nguyen 
*  Student ID: 104458179 
*  Date: June 18, 2023
********************************************************************************/ 


import React from 'react';
import PageHeader from '@/components/PageHeader';
import useSWR from 'swr';
import { useState, useEffect } from 'react';
import { Pagination, Accordion } from 'react-bootstrap';
import MovieDetails from '@/components/MovieDetails';

export default function Home() {
    const [page, setPage] = useState(1);
    const [pageData, setPageData] = useState([]);

    const { data, error } = useSWR(`https://tough-pig-tiara.cyclic.app/api/movies?page=${page}&perPage=10`);

    useEffect(() => {
        if (data) {
          setPageData(data);
        }
    }, [data]);  

    const previous = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };
    
    const next = () => {
        setPage(page + 1);
    };
    
    return (
      <>
        <PageHeader text="Film Collection: Sorted by Date" />
        <Accordion defaultActiveKey="0">
            {
                pageData.map((movie) => (
                    <Accordion.Item key={movie._id} eventKey={movie._id}>
                        <Accordion.Header>
                        <strong>{movie.title}&nbsp;</strong> ({movie.year}: Directed By {movie.directors.join(', ')})
                        </Accordion.Header>
                        <Accordion.Body>
                            <MovieDetails movie={movie} />
                        </Accordion.Body>
                    </Accordion.Item>
                ))
            }
        </Accordion>
        <br />
        <Pagination>
            <Pagination.Prev onClick={previous} />
            <Pagination.Item>{page}</Pagination.Item>
            <Pagination.Next onClick={next}></Pagination.Next>
        </Pagination>
      </>
    );
  }
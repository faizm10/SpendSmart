import {useEffect, useRef} from 'react';
import api from '../../api/axiosConfig';
import {useParams} from 'react-router-dom';
import {Container, Row, Col, Button} from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';
import React from 'react'
import { capitalize } from '@mui/material';
import { useState } from 'react';

const Reviews = ({getMovieData,movie,reviews,setReviews}) => {

    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;
    console.log(reviews);
    const [name, setname] = useState(null);
    useEffect(()=>{
        getMovieData(movieId);

        api.get(`/name`)
                .then(response => {
                    console.log(response);
                    setname(response.data.message);
                })
                .catch(error => {
                    console.error("err:", error);
                });
    },[])

    const addReview = async (e) =>{
        e.preventDefault();

        const rev = revText.current;

        try
        {
            const response = await api.post("/api/v1/reviews",{reviewBody:rev.value,imdbId:movieId});
            console.log(response);
            const updatedReviews = [...reviews, {...response.data}];
            
            setReviews(updatedReviews);
        }
        catch(err)
        {
            console.error(err);
        }
    }

    const deleteReview = async (reviewId) => { // Added delete function
        const token = localStorage.getItem("token");



        try {
            await api.delete(`/api/v1/reviews/${reviewId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setReviews(reviews.filter((review) => review.id !== reviewId)); // Remove deleted review from state
        } catch (err) {
            console.error("Error deleting review:", err);
        }
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h3>Reviews</h3>
                </Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <img src={movie?.poster} alt="Movie Poster" />
                </Col>
                <Col>
                    <>
                        <Row>
                            <Col>
                                <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a Review?" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </>
                    {}
                    <div style={styles.scrollContainer}>
                        {reviews?.slice().reverse().map((r, index) => (
                            <React.Fragment key={index}>
                                <Row>
                                    <Col>
                                        <b>{r.name ? r.name + ": " : null}</b>
                                        {r.body}
                                    </Col>
                                    <Col xs="auto">
                                        {name === r.name ? 
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            onClick={() => deleteReview(r.id)}
                                        >
                                            ❌
                                        </Button> : null}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr />
                                    </Col>
                                </Row>
                            </React.Fragment>
                        ))}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

const styles = {
    scrollContainer: {
        maxHeight: "600px",
        overflowY: "auto",
        border: "2px solid #ddd",
        padding: "10px",
        borderRadius: "5px",
        boxShadow: "inset 0px 5px 5px -5px rgba(0,0,0,0.2), inset 0px -5px 5px -5px rgba(0,0,0,0.2)", // Shadow for scroll effect
        background: "linear-gradient(white, rgba(255,255,255,0.8) 10%, rgba(255,255,255,0) 90%), linear-gradient(rgba(255,255,255,0) 10%, rgba(255,255,255,0.8) 90%, white)", // Gradient fade effect
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top, bottom",
        backgroundSize: "100% 10px",
        scrollbarWidth: "thin",
        scrollbarColor: "#888 #ddd",
    },
};
export default Reviews
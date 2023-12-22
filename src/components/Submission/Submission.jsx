import axios from "axios"; // Importing Axios for making HTTP requests
import { useDispatch, useSelector } from "react-redux"; // Importing React-Redux hooks for state management
import { CardContent, Card, Paper, Grid, Typography } from "@mui/material"; // Importing Material-UI components
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"; // Importing React Router hook for navigation

import BackButton from "../BackButton/BackButton"; // Importing a custom BackButton component
import swal from "sweetalert"; // Importing Sweetalert for displaying alerts

import Confetti from "react-confetti"; // Importing Confetti for celebratory animation
import { useEffect, useState } from "react"; // Importing React hooks for component lifecycle
import NextButton from "../NextButton/NextButton"; // Importing a custom NextButton component

function Submission() {

    const [isConfettiActive, setIsConfettiActive] = useState(false); // State for controlling Confetti animation
    const [confettiDimensions, setConfettiDimensions] = useState([{
        width: window.innerWidth,
        height: window.innerHeight,
    }]);

    const history = useHistory(); // Creating a navigation history object
    const dispatch = useDispatch(); // Creating a Redux dispatch function

    // Link local variables to global reducers
    const name = useSelector(store => store.name);
    const feeling = useSelector(store => store.feeling);
    const understanding = useSelector(store => store.understanding);
    const support = useSelector(store => store.support);
    const comments = useSelector(store => store.comments);

    // Handle submit function with /feedback POST request to the database
    const handleSubmit = e => {

        console.log(feeling);

        // POST feedback to the database
        axios.post('/feedback', {
            name: name,
            feeling: feeling,
            understanding: understanding,
            support: support,
            comments: comments
        })
            .then(response => {

                const action = { type: 'SUBMIT' };
                dispatch(action);
                setIsConfettiActive(true);

                // Clear Confetti animation after 5 seconds
                setTimeout(() => {
                    setIsConfettiActive(false)
                }, 5000);

                // Display success alert with timer and redirect to home page
                swal({
                    title: 'Submission successful',
                    icon: 'success',
                    text: 'You are now being re-directed to the home page.',
                    timer: 5000
                });

                // Redirect to home page after 5 seconds
                setTimeout(() => history.push('/'), 5000);
            })
            .catch(error => {
                console.error(error);
                alert('Something went wrong.');
            });
    };

    // Function to update Confetti dimensions on window resize
    const updateConfettiDimensions = () => {
        setConfettiDimensions({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    };

    useEffect(() => {
        // Add window resize event listener and clean up on unmount
        window.addEventListener('resize', updateConfettiDimensions);

        return () => {
            window.removeEventListener('resize', updateConfettiDimensions);
        }
    }, []);

    return (
        <>
            {isConfettiActive && <Confetti {...confettiDimensions} recycle={true} />} {/* Render Confetti when 'isConfettiActive' is true */}
            <Grid item xs={10} md={6}>
                <Paper elevation={5}>
                    <Card>
                        <CardContent>
                            <Typography variant="h4" textAlign={'center'} fontFamily={'inter'}>Review your feedback below:</Typography>
                            <div style={{ marginTop: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
                                <Typography variant="h5" marginBottom={'1rem'} fontFamily={'inter'}><b>Name:</b> {name}</Typography>
                                <Typography variant="h5" marginBottom={'1rem'} fontFamily={'inter'}><b>Feeling:</b> {feeling}</Typography>
                                <Typography variant="h5" marginBottom={'1rem'} fontFamily={'inter'}><b>Understanding:</b> {understanding}</Typography>
                                <Typography variant="h5" marginBottom={'1rem'} fontFamily={'inter'}><b>Support:</b> {support}</Typography>
                                <Typography variant="h5" marginBottom={'1rem'} fontFamily={'inter'}><b>Comments:</b> {comments}</Typography>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                <BackButton route={'/comments'} /> {/* Render a custom BackButton component */}
                                <NextButton function={handleSubmit} startIcon={true} text={'Submit feedback'} /> {/* Render a custom NextButton component */}
                            </div>
                        </CardContent>
                    </Card>
                </Paper>
            </Grid>
        </>
    )
}

export default Submission; // Exporting the 'Submission' component
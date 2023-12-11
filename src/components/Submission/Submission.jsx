import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Button, CardContent, Card, Paper, Grid, Typography } from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import BackButton from "../BackButton/BackButton";
import swal from "sweetalert";

import Confetti from "react-confetti";
import { useEffect, useState } from "react";

function Submission() {

    const [isConfettiActive, setIsConfettiActive] = useState(false);
    const [confettiDimensions, setConfettiDimensions] = useState([{
        width: window.innerWidth,
        height: window.innerHeight,
    }]);

    const history = useHistory();
    const dispatch = useDispatch();

    // Link local variables to global reducers
    const name = useSelector(store => store.name);
    const feeling = useSelector(store => store.feeling);
    const understanding = useSelector(store => store.understanding);
    const support = useSelector(store => store.support);
    const comments = useSelector(store => store.comments);

    // Handle submit function with /feedback POST request to database
    const handleSubmit = e => {

        // POST feedback to the database
        // Leaving here for now due to swal and confetti effects
        axios.post('/feedback', {
            name: name,
            feeling: Number(feeling),
            understanding: Number(understanding),
            support: Number(support),
            comments: comments
        })
            .then(response => {

                const action = { type: 'SUBMIT' };
                dispatch(action);
                setIsConfettiActive(true);
                setTimeout(() => {
                    setIsConfettiActive(false)
                }, 5000);

                swal({
                    title: 'Submission successful',
                    icon: 'success',
                    text: 'You are now being re-directed to the home page.',
                    timer: 5000
                });

                setTimeout(() => history.push('/'), 5000);
            })
            .catch(error => {
                console.error(error);
                alert('Something went wrong.');
            });



    };



    const updateConfettiDimensions = () => {
        setConfettiDimensions({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    };

    useEffect(() => {
        window.addEventListener('resize', updateConfettiDimensions);

        return () => {
            window.removeEventListener('resize', updateConfettiDimensions);
        }
    }, []);


    return (
        <>
            {isConfettiActive && <Confetti {...confettiDimensions} recycle={true} />}
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
                                <BackButton route={'/comments'} />
                                <Button variant="outlined"
                                    style={{ backgroundColor: '#ffde7a', color: '#900021', borderColor: '#900021' }}
                                    onClick={handleSubmit} startIcon={<ThumbUpIcon />}>Submit feedback</Button>
                            </div>
                        </CardContent>
                    </Card>
                </Paper>
            </Grid>
        </>
    )

}

export default Submission;
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import BackButton from "../BackButton/BackButton";
import swal from "sweetalert";

import Confetti from "react-confetti";
import { useEffect, useState } from "react";

function Submission() {

    const dispatch = useDispatch();

    const [isConfettiActive, setIsConfettiActive] = useState(false);
    const [confettiDimensions, setConfettiDimensions] = useState([{
        width: window.innerWidth,
        height: window.innerHeight,
    }]);

    const history = useHistory();

    // Link local variables to global reducers
    const name = useSelector(store => store.name);
    const feeling = useSelector(store => store.feeling);
    const understanding = useSelector(store => store.understanding);
    const support = useSelector(store => store.support);
    const comments = useSelector(store => store.comments);

    // Handle submit function with /feedback POST request to database
    const handleSubmit = e => {

        e.preventDefault();

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
            {isConfettiActive && <Confetti {...confettiDimensions} /*width={window.innerWidth} height={window.innerHeight}*/ recycle={true} />}
            <h2>Review your feedback below:</h2>
            <h3>Name: {name}</h3>
            <h3>Feeling: {feeling}</h3>
            <h3>Understanding: {understanding}</h3>
            <h3>Support: {support}</h3>
            <h3>Comments: {comments}</h3>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <BackButton route={'/comments'} />
                <Button variant="outlined" onClick={handleSubmit} startIcon={<ThumbUpIcon />}>Submit feedback</Button>
            </div>
        </>
    )

}

export default Submission;
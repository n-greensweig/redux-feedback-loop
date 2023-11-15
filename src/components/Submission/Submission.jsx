import axios from "axios";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import swal from "sweetalert";

import Confetti from "react-confetti";
import { useState } from "react";

function Submission() {

    // const [isConfettiActive, setIsConfettiActive] = useState(false);

    const history = useHistory();

    // Link local variables to global reducers
    const feeling = useSelector(store => store.feeling);
    const understanding = useSelector(store => store.understanding);
    const support = useSelector(store => store.support);
    const comments = useSelector(store => store.comments);

    // Handle submit function with /feedback POST request to database
    const handleSubmit = e => {

        // POST feedback to the database
        axios.post('/feedback', {
            feeling: Number(feeling),
            understanding: Number(understanding),
            support: Number(support),
            comments: comments
        })
            .then(response => {

                // const startConfetti = () => {
                //     setIsConfettiActive(true);
                //     setTimeout(() => {
                //         setIsConfettiActive(false)
                //     }, 3000);
                // }

                swal({
                    title: 'Submission successful',
                    icon: 'success',
                    text: 'You are now being re-directed to the home page.',
                    timer: 2000
                });

                setTimeout(() => history.push('/'), 2000);
            })
            .catch(error => {
                console.error(error);
                alert('Something went wrong.');
            });



    };

    return (
        <>
            <h2>Review your feedback below:</h2>
            <h3>Feeling: {feeling}</h3>
            <h3>Understanding: {understanding}</h3>
            <h3>Support: {support}</h3>
            <h3>Comments: {comments}</h3>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Button variant="outlined" onClick={e => history.push('/comments')} startIcon={<ArrowBackIcon />}>Back</Button>
                <Button variant="outlined" onClick={handleSubmit} startIcon={<ThumbUpIcon />}>Submit feedback</Button>
            </div>
            {/* {isConfettiActive && <Confetti />} */}
        </>
    )

}

export default Submission;
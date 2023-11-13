import axios from "axios";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import ReplayIcon from '@mui/icons-material/Replay';

function Submission() {

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
                console.log('successful POST');
            })
            .catch(error => {
                console.error(error);
                alert('Something went wrong.');
            });

        history.push('/');

    };

    return (
        <>
            <h1>Feedback submitted!</h1>
            <h2>View your feedback below:</h2>
            <h3>Feeling: {feeling}</h3>
            <h3>Understanding: {understanding}</h3>
            <h3>Support: {support}</h3>
            <h3>Comments: {comments}</h3>

            <Button variant="outlined" onClick={handleSubmit} endIcon={<ReplayIcon />}>Submit feedback</Button>
        </>
    )

}

export default Submission;
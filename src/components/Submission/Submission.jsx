import axios from "axios";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import swal from "sweetalert";

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

            <Button variant="outlined" onClick={handleSubmit} startIcon={<ThumbUpIcon />}>Submit feedback</Button>
        </>
    )

}

export default Submission;
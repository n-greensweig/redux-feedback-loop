import { Button, TextField, Grid, Paper, Card, CardContent, Typography } from "@mui/material";
import { NavigateNext } from "@mui/icons-material";

import NextButton from "../NextButton/NextButton";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";

function Comments() {

    const history = useHistory();

    // Comments dispactch
    const dispatch = useDispatch();
    const [newComments, setNewComments] = useState('');

    // Function to handle click of 'Next' button
    const handleClick = (e) => {

        e.preventDefault();
        const action = { type: 'COMMENTS', payload: newComments };
        dispatch(action);
        history.push('/submission');

    };

    return (
        <Grid item xs={12} md={6}>
            <Paper elevation={5}>
                <Card>
                    <CardContent>
                        <Typography sx={{ fontWeight: 'bold' }}>Any comments you want to leave?</Typography>
                        <TextField type="text"
                            label='Comments?'
                            onChange={e => setNewComments(e.target.value)}
                        />
                        <Button variant="outlined" onClick={handleClick} endIcon={<NavigateNext />}>Next</Button>
                    </CardContent>
                </Card>
            </Paper>
        </Grid>
    )

}

export default Comments;
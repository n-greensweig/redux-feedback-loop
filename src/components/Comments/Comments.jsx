import { Button, TextField, Grid, Paper, Card, CardContent, Typography } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
                        <Typography style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%'}} variant="h5" component="div" sx={{ fontWeight: 'bold', mb: 2 }}>Any comments you want to leave?</Typography>
                        <TextField type="text"
                            label='Comments'
                            multiline
                            rows={6}
                            onChange={e => setNewComments(e.target.value)}
                            sx={{width: '100%'}}
                            style={{ justifyContent: 'center', height: '100%', marginBottom: '5%'}}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <Button variant="outlined" onClick={e => history.push('/support')} startIcon={<ArrowBackIcon />}>Back</Button>
                            <Button variant="outlined" onClick={handleClick} endIcon={<ArrowForwardIcon />}>Next</Button>
                        </div>
                    </CardContent>
                </Card>
            </Paper>
        </Grid>
    )

}

export default Comments;
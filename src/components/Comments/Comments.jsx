import { TextField, Grid, Paper, Card, CardContent, Typography } from "@mui/material";
import BackButton from "../BackButton/BackButton";
import CardTypography from '../CardTypography/CardTypography';

import NextButton from "../NextButton/NextButton";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";

function Comments() {

    const history = useHistory();

    const storedComments = useSelector(state => state.comments);

    // Comments dispactch
    const dispatch = useDispatch();
    const [newComments, setNewComments] = useState(storedComments || '');

    // Function to handle click of 'Next' button
    const handleClick = (e) => {

        e.preventDefault();
        const action = { type: 'COMMENTS', payload: newComments };
        dispatch(action);
        history.push('/submission');

    };

    return (
        <Grid item xs={10} md={6}>
            <Paper elevation={5}>
                <Card>
                    <CardContent sx={{ textAlign: 'center' }}>
                    <CardTypography text={'Any comments you want to leave?'} />
                        <TextField type="text"
                            label='Comments'
                            multiline
                            rows={6}
                            onChange={e => setNewComments(e.target.value)}
                            defaultValue={newComments}
                            sx={{ width: '100%' }}
                            style={{ justifyContent: 'center', height: '100%', marginBottom: '5%' }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <BackButton route={'/support'} />
                            <NextButton function={handleClick} endIcon={true} text={'Next'} />
                        </div>
                    </CardContent>
                </Card>
            </Paper>
        </Grid >
    )

}

export default Comments;
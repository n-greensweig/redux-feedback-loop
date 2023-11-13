import NextButton from "../NextButton/NextButton";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import { Button, FormControlLabel, Radio, RadioGroup, Grid, Paper, Card, CardContent, Typography } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import swal from 'sweetalert';

function Understanding() {

    const history = useHistory();

    // Understanding dispatch
    const dispatch = useDispatch();
    const [newUnderstanding, setNewUnderstanding] = useState(null);

    // Function to handle click of 'Next' button
    const handleClick = (e) => {

        if (newUnderstanding === null) {
            swal({
                text: 'Please select an understanding level!',
                icon: 'warning'
            });
        } else {
            e.preventDefault();
            const action = { type: 'UNDERSTANDING', payload: newUnderstanding };
            dispatch(action);
            history.push(`/support`);
        }

    };

    const unclick = e => {
        if (newUnderstanding) {
            setNewUnderstanding(null);
        }
    };

    return (
        <Grid item xs={12} md={6}>
            <Paper elevation={5}>
                <Card>
                    <CardContent>
                        <Typography sx={{ fontWeight: 'bold' }}>How well are you understanding the content?</Typography>
                        <RadioGroup
                            name='newUnderstanding'
                            value={newUnderstanding}
                            onChange={e => setNewUnderstanding(e.target.value)}
                            row>
                            <FormControlLabel value={1} control={<Radio onClick={unclick} />} label='1' />
                            <FormControlLabel value={2} control={<Radio onClick={unclick} />} label='2' />
                            <FormControlLabel value={3} control={<Radio onClick={unclick} />} label='3' />
                            <FormControlLabel value={4} control={<Radio onClick={unclick} />} label='4' />
                            <FormControlLabel value={5} control={<Radio onClick={unclick} />} label='5' />
                        </RadioGroup>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                <Button variant="outlined" onClick={e => history.push('/feeling')} startIcon={<ArrowBackIcon />}>Back</Button>
                                <Button variant="outlined" onClick={handleClick} endIcon={<ArrowForwardIcon />}>Next</Button>
                        </div>
                    </CardContent>
                </Card>
            </Paper>
        </Grid >
    )

}

export default Understanding;
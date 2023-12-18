import NextButton from "../NextButton/NextButton";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import { Button, FormControlLabel, Radio, RadioGroup, Grid, Paper, Card, CardContent, Typography } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BackButton from "../BackButton/BackButton";

import swal from 'sweetalert';

function Understanding() {

    const history = useHistory();

    const storedUnderstanding = useSelector(state => state.understanding);

    // Understanding dispatch
    const dispatch = useDispatch();
    const [newUnderstanding, setNewUnderstanding] = useState(storedUnderstanding || null);

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
        <Grid item xs={10} md={6}>
            <Paper elevation={5}>
                <Card>
                    <CardContent sx={{ textAlign: 'center' }}>
                        <Typography style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                            fontFamily: 'inter'
                        }}
                            variant="h5"
                            component="div"
                            sx={{
                                fontWeight: 'bold',
                                mb: 2
                            }}>How well are you understanding the content?</Typography>
                        <RadioGroup
                            name='newUnderstanding'
                            value={newUnderstanding}
                            onChange={e => setNewUnderstanding(e.target.value)}
                            defaultValue={newUnderstanding}
                            row
                            style={{ alignItems: 'center', justifyContent: 'center', height: '100%', marginBottom: '15px' }}
                        >
                            <FormControlLabel value={'Very poorly'} control={<Radio onClick={unclick} />} label='Very poorly' labelPlacement='bottom' />
                            <FormControlLabel value={'Poorly'} control={<Radio onClick={unclick} />} label='Poorly' labelPlacement='bottom' />
                            <FormControlLabel value={'Neutral'} control={<Radio onClick={unclick} />} label='Neutral' labelPlacement='bottom' />
                            <FormControlLabel value={'Well'} control={<Radio onClick={unclick} />} label='Well' labelPlacement='bottom' />
                            <FormControlLabel value={'Very well'} control={<Radio onClick={unclick} />} label='Very well' labelPlacement='bottom' />
                        </RadioGroup>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <BackButton route={'/feeling'} />
                            <Button variant="outlined"
                                style={{ backgroundColor: 'white', color: '#900021', borderColor: '#900021' }}
                                onClick={handleClick}
                                endIcon={<ArrowForwardIcon />}>Next</Button>
                        </div>
                    </CardContent>
                </Card>
            </Paper>
        </Grid >
    )

}

export default Understanding;
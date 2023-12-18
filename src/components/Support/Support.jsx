import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { Button, FormControlLabel, Radio, RadioGroup, Grid, Paper, Card, CardContent, Typography } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BackButton from "../BackButton/BackButton";

import swal from 'sweetalert';

function Support() {

    const history = useHistory();

    const storedSupport = useSelector(state => state.support);

    // Support dispatch
    const dispatch = useDispatch();
    const [newSupport, setNewSupport] = useState(storedSupport || null);

    // Function to handle click of 'Next' button
    const handleClick = (e) => {

        if (newSupport === null) {
            swal({
                text: 'Please select a support level!',
                icon: 'warning'
            });
        } else {
            e.preventDefault();
            const action = { type: 'SUPPORT', payload: newSupport };
            dispatch(action);
            history.push(`/comments`);
        }

    };

    const unclick = e => {
        if (newSupport) {
            setNewSupport(null);
        }
    };

    return (
        <Grid item xs={10} md={6}>
            <Paper elevation={5}>
                <Card>
                    <CardContent sx={{ textAlign: 'center' }}>
                        <Typography
                            style={{
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
                            }}>How well are you being supported?</Typography>
                        <RadioGroup
                            name='newSupport'
                            value={newSupport}
                            onChange={e => setNewSupport(e.target.value)}
                            defaultValue={newSupport}
                            row
                            style={{ alignItems: 'center', justifyContent: 'center', height: '100%' }}
                        >
                            <FormControlLabel value={1} control={<Radio onClick={unclick} />} label='Very poorly' labelPlacement='bottom' />
                            <FormControlLabel value={2} control={<Radio onClick={unclick} />} label='Poorly' labelPlacement='bottom' />
                            <FormControlLabel value={3} control={<Radio onClick={unclick} />} label='Neutral' labelPlacement='bottom' />
                            <FormControlLabel value={4} control={<Radio onClick={unclick} />} label='Well' labelPlacement='bottom' />
                            <FormControlLabel value={5} control={<Radio onClick={unclick} />} label='Very well' labelPlacement='bottom' />
                        </RadioGroup>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <BackButton route={'/understanding'} />
                            <Button variant="outlined"
                                onClick={handleClick}
                                style={{ backgroundColor: 'white', color: '#900021', borderColor: '#900021' }}
                                endIcon={<ArrowForwardIcon />}>Next</Button>
                        </div>
                    </CardContent>
                </Card>
            </Paper>
        </Grid>
    )

}

export default Support;
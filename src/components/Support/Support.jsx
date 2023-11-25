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
        <Grid item xs={12} md={6}>
            <Paper elevation={5}>
                <Card>
                    <CardContent>
                        <Typography style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }} variant="h5" component="div" sx={{ fontWeight: 'bold', mb: 2 }}>How well are you being supported?</Typography>
                        <RadioGroup
                            name='newSupport'
                            value={newSupport}
                            onChange={e => setNewSupport(e.target.value)}
                            defaultValue={newSupport}
                            row
                            style={{ alignItems: 'center', justifyContent: 'center', height: '100%' }}
                        >
                            <FormControlLabel value={1} control={<Radio onClick={unclick} />} label='1' />
                            <FormControlLabel value={2} control={<Radio onClick={unclick} />} label='2' />
                            <FormControlLabel value={3} control={<Radio onClick={unclick} />} label='3' />
                            <FormControlLabel value={4} control={<Radio onClick={unclick} />} label='4' />
                            <FormControlLabel value={5} control={<Radio onClick={unclick} />} label='5' />
                        </RadioGroup>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <BackButton route={'/understanding'} />
                            <Button variant="outlined" onClick={handleClick} endIcon={<ArrowForwardIcon />}>Next</Button>
                        </div>
                    </CardContent>
                </Card>
            </Paper>
        </Grid>
    )

}

export default Support;
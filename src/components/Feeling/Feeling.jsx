import { useSelector, useDispatch } from 'react-redux';
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { FormControlLabel, Radio, RadioGroup, Grid, Paper, Card, CardContent, Typography } from "@mui/material";

import NextButton from "../NextButton/NextButton";
import swal from 'sweetalert';
import BackButton from "../BackButton/BackButton";

function Feeling() {

    const history = useHistory();

    const storedFeeling = useSelector(state => state.feeling);

    // Add feeling dispatch
    const [newFeeling, setNewFeeling] = useState(storedFeeling || null);

    // Dispatch
    const dispatch = useDispatch();

    // Function to handle click of 'Next' button
    const handleClick = (e) => {

        if (newFeeling === null) {
            swal({
                text: 'Please select a feeling level!',
                icon: 'warning'
            });
        } else {
            e.preventDefault();
            const action = { type: 'FEELING', payload: newFeeling };
            dispatch(action);
            console.log(action.payload);
            history.push(`/understanding`);
        }

    };

    const unclick = e => {
        if (newFeeling) {
            setNewFeeling(null);
        }
    };


    return (
        <>
            <Grid item xs={10} md={6} style={{ alignContent: 'center', alignItems: 'center' }}>
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
                                }}>How are you feeling today?</Typography>
                            <RadioGroup
                                name='newFeeling'
                                value={newFeeling}
                                onChange={e => setNewFeeling(e.target.value)}
                                defaultValue={newFeeling}
                                row
                                style={{ alignItems: 'center', justifyContent: 'center', height: '100%', marginBottom: '15px' }}
                            >
                                <FormControlLabel value={'Very bad'} control={<Radio onClick={unclick} />} label='Very bad' labelPlacement='bottom' />
                                <FormControlLabel value={'Bad'} control={<Radio onClick={unclick} />} label='Bad' labelPlacement='bottom' />
                                <FormControlLabel value={'Neutral'} control={<Radio onClick={unclick} />} label='Neutral' labelPlacement='bottom' />
                                <FormControlLabel value={'Good'} control={<Radio onClick={unclick} />} label='Good' labelPlacement='bottom' />
                                <FormControlLabel value={'Very good'} control={<Radio onClick={unclick} />} label='Very good' labelPlacement='bottom' />
                            </RadioGroup>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                <BackButton route={'/name'} />
                                <NextButton function={handleClick} text={'Next'} />
                            </div>
                        </CardContent>
                    </Card>
                </Paper>
            </Grid >
        </>
    )

}

export default Feeling;
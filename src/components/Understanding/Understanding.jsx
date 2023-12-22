import NextButton from "../NextButton/NextButton";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import { FormControlLabel, Radio, RadioGroup, Grid, Paper, Card, CardContent, Typography } from "@mui/material";
import BackButton from "../BackButton/BackButton";
import CardTypography from '../CardTypography/CardTypography';

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
                        <CardTypography text={'How well are you understanding the content?'} />
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
                            <NextButton function={handleClick} endIcon={true} text={'Next'} />
                        </div>
                    </CardContent>
                </Card>
            </Paper>
        </Grid >
    )

}

export default Understanding;
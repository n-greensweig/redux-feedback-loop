import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import NextButton from "../NextButton/NextButton";
import { FormControlLabel, Radio, RadioGroup, Grid, Paper, Card, CardContent, Typography } from "@mui/material";
import BackButton from "../BackButton/BackButton";
import CardTypography from '../CardTypography/CardTypography';


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
                    <CardTypography text={'How well are you being supported?'} />

                        <RadioGroup
                            name='newSupport'
                            value={newSupport}
                            onChange={e => setNewSupport(e.target.value)}
                            defaultValue={newSupport}
                            row
                            style={{ alignItems: 'center', justifyContent: 'center', height: '100%' }}
                        >
                            <FormControlLabel value={'Very poorly'} control={<Radio onClick={unclick} />} label='Very poorly' labelPlacement='bottom' />
                            <FormControlLabel value={'Poorly'} control={<Radio onClick={unclick} />} label='Poorly' labelPlacement='bottom' />
                            <FormControlLabel value={'Neutral'} control={<Radio onClick={unclick} />} label='Neutral' labelPlacement='bottom' />
                            <FormControlLabel value={'Well'} control={<Radio onClick={unclick} />} label='Well' labelPlacement='bottom' />
                            <FormControlLabel value={'Very well'} control={<Radio onClick={unclick} />} label='Very well' labelPlacement='bottom' />
                        </RadioGroup>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <BackButton route={'/understanding'} />
                            <NextButton function={handleClick} endIcon={true} text={'Next'} />
                        </div>
                    </CardContent>
                </Card>
            </Paper>
        </Grid>
    )

}

export default Support;
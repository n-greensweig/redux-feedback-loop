import { TextField, Grid, Paper, Card, CardContent, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import BackButton from "../BackButton/BackButton";
import NextButton from "../NextButton/NextButton";

import swal from 'sweetalert';

function Name() {

    const history = useHistory();

    const storedName = useSelector(state => state.name);

    const [newName, setNewName] = useState(storedName || '');
    const dispatch = useDispatch();

    const handleClick = (e) => {

        if (newName === '') {
            swal({
                text: 'Please provide your name!',
                icon: 'warning'
            });
        } else {
            e.preventDefault();
            const action = { type: 'NAME', payload: newName };
            dispatch(action);
            history.push('/feeling');
        }

    }

    return (
        <>
            <Grid item xs={10} md={6}>
                <Paper elevation={5}>
                    <Card>
                        <CardContent sx={{textAlign: 'center'}}>
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
                                sx={{ fontWeight: 'bold', mb: 2 }}>
                                Full name
                            </Typography>
                            <TextField type="text"
                                label='Name'
                                rows={1}
                                onChange={e => setNewName(e.target.value)}
                                defaultValue={newName}
                                sx={{ width: '100%' }}
                                style={{ justifyContent: 'center', height: '100%', marginBottom: '5%' }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                <BackButton route={'/'} />
                                <NextButton function={handleClick} endIcon={true} text={'Next'} />
                            </div>
                        </CardContent>
                    </Card>
                </Paper>
            </Grid>
        </>
    )

}

export default Name;
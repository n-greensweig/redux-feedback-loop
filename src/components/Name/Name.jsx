import { Button, TextField, Grid, Paper, Card, CardContent, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import BackButton from "../BackButton/BackButton";

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
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
        <Grid item xs={12} md={6}>
            <Paper elevation={5}>
                <Card>
                    <CardContent>
                        <Typography style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%'
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
                            <Button variant="outlined" onClick={handleClick} endIcon={<ArrowForwardIcon />}>Next</Button>
                        </div>
                    </CardContent>
                </Card>
            </Paper>
        </Grid>
    )

}

export default Name;
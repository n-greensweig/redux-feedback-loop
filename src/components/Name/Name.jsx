import { Button, TextField, Grid, Paper, Card, CardContent, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Name() {

    const history = useHistory();

    const [newName, setNewName] = useState('');
    const dispatch = useDispatch();

    const handleClick = (e) => {

        e.preventDefault();
        const action = { type: 'NAME', payload: newName };
        dispatch(action);
        history.push('/feeling');

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
                            sx={{ width: '100%' }}
                            style={{ justifyContent: 'center', height: '100%', marginBottom: '5%' }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <Button variant="outlined" onClick={e => history.push('/')} startIcon={<ArrowBackIcon />}>Back</Button>
                            <Button variant="outlined" onClick={handleClick} endIcon={<ArrowForwardIcon />}>Next</Button>
                        </div>
                    </CardContent>
                </Card>
            </Paper>
        </Grid>
    )

}

export default Name;
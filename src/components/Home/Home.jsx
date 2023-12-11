import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button, Paper, Typography, Grid, Card, CardContent } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function Home() {

    const history = useHistory();

    return (

        <Grid item xs={10} md={6} style={{ textAlign: 'center' }}>
            <Paper elevation={5}>
                <Card>
                    <CardContent style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <Typography sx={{ fontWeight: 'bold' }}>Submit a  student feedback form 😁</Typography>
                        <Button variant="outlined"
                            style={{ backgroundColor: 'white', color: '#900021', borderColor: '#900021' }}
                            onClick={e => history.push('/name')}
                            endIcon={<ArrowForwardIcon />}>Start survey</Button>
                    </CardContent>
                </Card>
            </Paper>
        </Grid>

    )

}

export default Home;
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button, Paper, Typography, Grid, Card, CardContent } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function Home() {

    const history = useHistory();

    return (
        <Grid container>
            <Grid item xs={12}style={{ alignContent: 'center', alignItems: 'center' }}>
                <Paper elevation={5}>
                    <Card>
                        <CardContent>
                            <Typography sx={{ fontWeight: 'bold' }}>Submit a new feedback form 😁</Typography>
                            <Button variant="outlined" onClick={e => history.push('/name')} endIcon={<ArrowForwardIcon />}>Start survey</Button>
                        </CardContent>
                    </Card>
                </Paper>
            </Grid>
        </Grid>


    )

}

export default Home;
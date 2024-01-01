import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Paper, Typography, Grid, Card, CardContent } from "@mui/material";
import NextButton from "../NextButton/NextButton";

function Home() {
    
    // Access the history object for routing
    const history = useHistory();

    return (
        // Render the Home component UI with a link to start the survey
        <Grid item xs={10} md={6} style={{ textAlign: 'center' }}>
            <Paper elevation={5}>
                <Card>
                    <CardContent style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <Typography sx={{ fontWeight: 'bold' }}>Submit a student feedback form 😁</Typography>
                        <NextButton function={e => history.push('/name')} endIcon={true} text={'Start survey'} />
                    </CardContent>
                </Card>
            </Paper>
        </Grid>
    )
}

export default Home;
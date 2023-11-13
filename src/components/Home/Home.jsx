import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function Home() {

    const history = useHistory();

    return (
        <>
            <h1>Submit a new feedback form 😁</h1>
            <Button variant="outlined" onClick={e => history.push('/feeling')} endIcon={<ArrowForwardIcon />}>Start survey</Button>
        </>

    )

}

export default Home;
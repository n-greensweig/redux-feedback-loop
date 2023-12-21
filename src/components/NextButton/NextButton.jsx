import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button } from "@mui/material";

function NextButton(props) {

    return (
        <Button variant="outlined"
            style={{ backgroundColor: 'white', color: '#900021', borderColor: '#900021' }}
            onClick={props.function} endIcon={<ArrowForwardIcon />}>{props.text}</Button>
    )

}

export default NextButton;
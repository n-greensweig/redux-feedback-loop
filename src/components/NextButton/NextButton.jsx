import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Button } from "@mui/material";

function NextButton(props) {

    return (
        <Button variant="outlined"
            style={{ backgroundColor: 'white', color: '#900021', borderColor: '#900021' }}
            onClick={props.function} startIcon={props.startIcon ? <ThumbUpIcon /> : null}
            endIcon={props.endIcon ? <ArrowForwardIcon /> : null}>{props.text}</Button>
    )

}

export default NextButton;
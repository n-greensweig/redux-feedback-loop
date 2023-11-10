import { TextField } from "@mui/material";
import NextButton from "../NextButton/NextButton";

function Feeling() {

    return (
        <>
            <h1>How are you feeling today?</h1>
            <TextField type="number"
                label='Feeling?'
            />
            <NextButton path={'understanding'} />
        </>
    )

}

export default Feeling;
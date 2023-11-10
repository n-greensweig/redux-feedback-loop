import { TextField } from "@mui/material";
import NextButton from "../NextButton/NextButton";

function Understanding() {

    return (
        <>
            <h1>How well are you understanding the content?</h1>
            <TextField type="number"
                label="Understanding?" />
            <NextButton path={'support'} />
        </>
    )

}

export default Understanding;
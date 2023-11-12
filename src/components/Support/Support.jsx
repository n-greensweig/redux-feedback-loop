import { TextField } from "@mui/material";
import NextButton from "../NextButton/NextButton";

function Support() {

    // Add support dispatch

    return (
        <>
            <h1>How well are you being supported?</h1>
            <TextField type="number"
                label="Support?" />
            <NextButton path={'comments'} />
        </>
    )

}

export default Support;
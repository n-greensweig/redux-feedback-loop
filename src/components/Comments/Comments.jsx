import { TextField } from "@mui/material";
import NextButton from "../NextButton/NextButton";

function Comments() {

    return (
        <>
            <h1>Any comments you want to leave?</h1>
            <TextField type="text"
                label='Comments?'
            />
            <NextButton path={'submission'} />
        </>
    )

}

export default Comments;
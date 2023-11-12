import { TextField, useScrollTrigger } from "@mui/material";
import NextButton from "../NextButton/NextButton";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { useState } from "react";

import { Button } from "@mui/material";
import { NavigateNext } from "@mui/icons-material";

function Support() {

    const history = useHistory();

    // Support dispatch
    const dispatch = useDispatch();
    const [newSupport, setNewSupport] = useState(null);

    // Function to handle click of 'Next' button
    const handleClick = (e) => {

        e.preventDefault();
        const action = { type: 'SUPPORT', payload: newSupport };
        dispatch(action);
        history.push(`/comments`);

    };

    return (
        <>
            <h1>How well are you being supported?</h1>
            <TextField type="number"
                label="Support?"
                onChange={e => setNewSupport(e.target.value)}
            />

            {/* <NextButton path={'comments'} /> */}
            <Button variant="outlined" onClick={handleClick} endIcon={<NavigateNext />}>Next</Button>
        </>
    )

}

export default Support;
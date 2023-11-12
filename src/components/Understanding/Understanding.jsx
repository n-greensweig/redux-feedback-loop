import { TextField } from "@mui/material";
import NextButton from "../NextButton/NextButton";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import { Button } from "@mui/material";
import { NavigateNext } from "@mui/icons-material";

function Understanding() {

    const history = useHistory();

    // Understanding dispatch
    const dispatch = useDispatch();
    const [newUnderstanding, setNewUnderstanding] = useState(null);

    // Function to handle click of 'Next' button
    const handleClick = (e) => {

        e.preventDefault();
        const action = { type: 'UNDERSTANDING', payload: newUnderstanding };
        dispatch(action);
        history.push(`/support`);
        
    };

    return (
        <>
            <h1>How well are you understanding the content?</h1>
            <TextField type="number"
                label="Understanding?"
                onChange={e => setNewUnderstanding(e.target.value)}
                />
            {/* <NextButton path={'support'} /> */}
            <Button variant="outlined" onClick={handleClick} endIcon={<NavigateNext />}>Next</Button>
        </>
    )

}

export default Understanding;
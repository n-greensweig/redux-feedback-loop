import { TextField } from "@mui/material";
import NextButton from "../NextButton/NextButton";
import { useSelector, useDispatch } from 'react-redux';
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import { NavigateNext } from "@mui/icons-material";
import { Button } from "@mui/material";

function Feeling() {

    const history = useHistory();

    // Add feeling dispatch
    // const feeling = useSelector(store => store.feeling);
    const [newFeeling, setNewFeeling] = useState(null);

    // Dispatch
    const dispatch = useDispatch();

    // Function to handle click of 'Next' button
    const handleClick = (e) => {

        e.preventDefault();
        history.push(`/understanding`);
        const action = { type: 'FEELING', payload: newFeeling };
        console.log(action.payload);
        dispatch(action);
    };


    return (
        <>
            <h1>How are you feeling today?</h1>
            <TextField type="number"
                label='Feeling?'
                onChange={e => setNewFeeling(e.target.value)}
            />

            <Button variant="outlined" onClick={handleClick} startIcon={<NavigateNext />}>Next</Button>
        </>
    )

}

export default Feeling;
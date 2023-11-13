import { TextField } from "@mui/material";
import NextButton from "../NextButton/NextButton";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import { Button, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { NavigateNext } from "@mui/icons-material";

import swal from 'sweetalert';

function Understanding() {

    const history = useHistory();

    // Understanding dispatch
    const dispatch = useDispatch();
    const [newUnderstanding, setNewUnderstanding] = useState(null);

    // Function to handle click of 'Next' button
    const handleClick = (e) => {

        if (newUnderstanding === null) {
            swal({
                text: 'Please select an understanding level!',
                icon: 'warning'
            });
        } else {
            e.preventDefault();
            const action = { type: 'UNDERSTANDING', payload: newUnderstanding };
            dispatch(action);
            history.push(`/support`);
        }

    };

    return (
        <>
            <h1>How well are you understanding the content?</h1>
            <RadioGroup
                name='newUnderstanding'
                value={newUnderstanding}
                onChange={e => setNewUnderstanding(e.target.value)}
                row>
                <FormControlLabel value={1} control={<Radio />} label='1' />
                <FormControlLabel value={2} control={<Radio />} label='2' />
                <FormControlLabel value={3} control={<Radio />} label='3' />
                <FormControlLabel value={4} control={<Radio />} label='4' />
                <FormControlLabel value={5} control={<Radio />} label='5' />
            </RadioGroup>

            <Button variant="outlined" onClick={handleClick} endIcon={<NavigateNext />}>Next</Button>
        </>
    )

}

export default Understanding;
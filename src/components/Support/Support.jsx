import { TextField, useScrollTrigger } from "@mui/material";
import NextButton from "../NextButton/NextButton";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { useState } from "react";

import { Button, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { NavigateNext } from "@mui/icons-material";

import swal from 'sweetalert';

function Support() {

    const history = useHistory();

    // Support dispatch
    const dispatch = useDispatch();
    const [newSupport, setNewSupport] = useState(null);

    // Function to handle click of 'Next' button
    const handleClick = (e) => {

        if (newSupport === null) {
            swal({
                text: 'Please select a support level!',
                icon: 'warning'
            });
        } else {   
            e.preventDefault();
            const action = { type: 'SUPPORT', payload: newSupport };
            dispatch(action);
            history.push(`/comments`);
        }

    };

    return (
        <>
            <h1>How well are you being supported?</h1>
            <RadioGroup
                name='newSupport'
                value={newSupport}
                onChange={e => setNewSupport(e.target.value)}
                row
                >
                <FormControlLabel value={1} control={<Radio />} label='1' />
                <FormControlLabel value={2} control={<Radio />} label='2' />
                <FormControlLabel value={3} control={<Radio />} label='3' />
                <FormControlLabel value={4} control={<Radio />} label='4' />
                <FormControlLabel value={5} control={<Radio />} label='5' />
            </RadioGroup>

            {/* <NextButton path={'comments'} /> */}
            <Button variant="outlined" onClick={handleClick} endIcon={<NavigateNext />}>Next</Button>
        </>
    )

}

export default Support;
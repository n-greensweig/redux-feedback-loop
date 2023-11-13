import { TextField } from "@mui/material";
import NextButton from "../NextButton/NextButton";
import { useSelector, useDispatch } from 'react-redux';
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import { Button, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { NavigateNext } from "@mui/icons-material";

import swal from 'sweetalert';

function Feeling() {

    const history = useHistory();

    // Add feeling dispatch
    const [newFeeling, setNewFeeling] = useState(null);

    // Dispatch
    const dispatch = useDispatch();

    // Function to handle click of 'Next' button
    const handleClick = (e) => {

        if (newFeeling === null) {
            swal({
                text: 'Please select a feeling level!',
                icon: 'warning'
            });
        } else {
            e.preventDefault();
            const action = { type: 'FEELING', payload: newFeeling };
            dispatch(action);
            console.log(action.payload);
            history.push(`/understanding`);
        }

    };


    return (
        <>
            <h1>How are you feeling today?</h1>
            <RadioGroup
                name='newFeeling'
                value={newFeeling}
                onChange={e => setNewFeeling(e.target.value)}
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

export default Feeling;
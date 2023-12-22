// React/Redux imports
import { useSelector, useDispatch } from 'react-redux'; // Importing React-Redux hooks for state management
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"; // Importing React Router hook for navigation
import { useState } from "react"; // Importing React hook for managing component state

// MUI components
import { FormControlLabel, Radio, RadioGroup, Grid, Paper, Card, CardContent } from "@mui/material"; // Importing Material-UI components

// Personally-created React components
import BackButton from "../BackButton/BackButton"; // Importing a custom BackButton component
import NextButton from "../NextButton/NextButton"; // Importing a custom NextButton component
import CardTypography from '../CardTypography/CardTypography'; // Importing a custom CardTypography component

// Sweetalert import
import swal from 'sweetalert'; // Importing Sweetalert for displaying alerts

function Understanding() {

    const history = useHistory(); // Creating a navigation history object

    const storedUnderstanding = useSelector(state => state.understanding); // Accessing 'understanding' property from Redux store

    // Understanding dispatch
    const dispatch = useDispatch(); // Creating a Redux dispatch function
    const [newUnderstanding, setNewUnderstanding] = useState(storedUnderstanding || null); // Initializing component state for 'newUnderstanding'

    // Function to handle click of 'Next' button
    const handleClick = (e) => {

        if (newUnderstanding === null) {
            // Display a warning alert if 'newUnderstanding' is null
            swal({
                text: 'Please select an understanding level!',
                icon: 'warning'
            });
        } else {
            e.preventDefault(); // Prevent the default form submission

            // Dispatch a Redux action with type 'UNDERSTANDING' and 'newUnderstanding' as payload
            const action = { type: 'UNDERSTANDING', payload: newUnderstanding };
            dispatch(action);

            // Navigate to the '/support' route using the 'history' object
            history.push(`/support`);
        }

    };

    // Function to clear the selection when a radio button is clicked again
    const unclick = e => {
        if (newUnderstanding) {
            setNewUnderstanding(null);
        }
    };

    return (
        <Grid item xs={10} md={6}>
            <Paper elevation={5}>
                <Card>
                    <CardContent sx={{ textAlign: 'center' }}>
                        <CardTypography text={'How well are you understanding the content?'} /> {/* Render a custom CardTypography component */}
                        <RadioGroup
                            name='newUnderstanding'
                            value={newUnderstanding}
                            onChange={e => setNewUnderstanding(e.target.value)} // Update 'newUnderstanding' state on radio button change
                            defaultValue={newUnderstanding}
                            row
                            style={{ alignItems: 'center', justifyContent: 'center', height: '100%', marginBottom: '15px' }}
                        >
                            <FormControlLabel value={'Very poorly'} control={<Radio onClick={unclick} />} label='Very poorly' labelPlacement='bottom' />
                            <FormControlLabel value={'Poorly'} control={<Radio onClick={unclick} />} label='Poorly' labelPlacement='bottom' />
                            <FormControlLabel value={'Neutral'} control={<Radio onClick={unclick} />} label='Neutral' labelPlacement='bottom' />
                            <FormControlLabel value={'Well'} control={<Radio onClick={unclick} />} label='Well' labelPlacement='bottom' />
                            <FormControlLabel value={'Very well'} control={<Radio onClick={unclick} />} label='Very well' labelPlacement='bottom' />
                        </RadioGroup>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <BackButton route={'/feeling'} /> {/* Render a custom BackButton component */}
                            <NextButton function={handleClick} endIcon={true} text={'Next'} /> {/* Render a custom NextButton component */}
                        </div>
                    </CardContent>
                </Card>
            </Paper>
        </Grid >
    )

}

export default Understanding; // Exporting the 'Understanding' component
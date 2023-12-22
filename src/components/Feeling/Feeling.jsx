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

function Feeling() {

    const history = useHistory(); // Creating a navigation history object

    const storedFeeling = useSelector(state => state.feeling); // Accessing 'feeling' property from Redux store

    // Feeling dispatch
    const [newFeeling, setNewFeeling] = useState(storedFeeling || null); // Initializing component state for 'newFeeling'

    // Dispatch
    const dispatch = useDispatch(); // Creating a Redux dispatch function

    // Function to handle click of 'Next' button
    const handleClick = (e) => {

        if (newFeeling === null) {
            // Display a warning alert if 'newFeeling' is null
            swal({
                text: 'Please select a feeling level!',
                icon: 'warning'
            });
        } else {
            e.preventDefault(); // Prevent the default form submission

            // Dispatch a Redux action with type 'FEELING' and 'newFeeling' as payload
            const action = { type: 'FEELING', payload: newFeeling };
            dispatch(action);
            console.log(action.payload);

            // Navigate to the '/understanding' route using the 'history' object
            history.push(`/understanding`);
        }

    };

    // Function to clear the selection when a radio button is clicked again
    const unclick = e => {
        if (newFeeling) {
            setNewFeeling(null);
        }
    };

    return (
        <>
            <Grid item xs={10} md={6} style={{ alignContent: 'center', alignItems: 'center' }}>
                <Paper elevation={5}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <CardTypography text={'How are you feeling today?'} /> {/* Render a custom CardTypography component */}
                            <RadioGroup
                                name='newFeeling'
                                value={newFeeling}
                                onChange={e => setNewFeeling(e.target.value)} // Update 'newFeeling' state on radio button change
                                defaultValue={newFeeling}
                                row
                                style={{ alignItems: 'center', justifyContent: 'center', height: '100%', marginBottom: '15px' }}
                            >
                                <FormControlLabel value={'Very bad'} control={<Radio onClick={unclick} />} label='Very bad' labelPlacement='bottom' />
                                <FormControlLabel value={'Bad'} control={<Radio onClick={unclick} />} label='Bad' labelPlacement='bottom' />
                                <FormControlLabel value={'Neutral'} control={<Radio onClick={unclick} />} label='Neutral' labelPlacement='bottom' />
                                <FormControlLabel value={'Good'} control={<Radio onClick={unclick} />} label='Good' labelPlacement='bottom' />
                                <FormControlLabel value={'Very good'} control={<Radio onClick={unclick} />} label='Very good' labelPlacement='bottom' />
                            </RadioGroup>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                <BackButton route={'/name'} /> {/* Render a custom BackButton component */}
                                <NextButton function={handleClick} endIcon={true} text={'Next'} /> {/* Render a custom NextButton component */}
                            </div>
                        </CardContent>
                    </Card>
                </Paper>
            </Grid >
        </>
    )

}

export default Feeling; // Exporting the 'Feeling' component
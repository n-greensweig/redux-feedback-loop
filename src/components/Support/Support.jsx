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

function Support() {

    const history = useHistory(); // Creating a navigation history object

    const storedSupport = useSelector(state => state.support); // Accessing 'support' property from Redux store

    // Support dispatch
    const dispatch = useDispatch(); // Creating a Redux dispatch function
    const [newSupport, setNewSupport] = useState(storedSupport || null); // Initializing component state for 'newSupport'

    // Function to handle click of 'Next' button
    const handleClick = (e) => {

        if (newSupport === null) {
            // Display a warning alert if 'newSupport' is null
            swal({
                text: 'Please select a support level!',
                icon: 'warning'
            });
        } else {
            e.preventDefault(); // Prevent the default form submission

            // Dispatch a Redux action with type 'SUPPORT' and 'newSupport' as payload
            const action = { type: 'SUPPORT', payload: newSupport };
            dispatch(action);

            // Navigate to the '/comments' route using the 'history' object
            history.push(`/comments`);
        }

    };

    // Function to clear the selection when a radio button is clicked again
    const unclick = e => {
        if (newSupport) {
            setNewSupport(null);
        }
    };

    return (
        <Grid item xs={10} md={6}>
            <Paper elevation={5}>
                <Card>
                    <CardContent sx={{ textAlign: 'center' }}>
                    <CardTypography text={'How well are you being supported?'} /> {/* Render a custom CardTypography component */}

                        <RadioGroup
                            name='newSupport'
                            value={newSupport}
                            onChange={e => setNewSupport(e.target.value)} // Update 'newSupport' state on radio button change
                            defaultValue={newSupport}
                            row
                            style={{ alignItems: 'center', justifyContent: 'center', height: '100%' }}
                        >
                            <FormControlLabel value={'Very poorly'} control={<Radio onClick={unclick} />} label='Very poorly' labelPlacement='bottom' />
                            <FormControlLabel value={'Poorly'} control={<Radio onClick={unclick} />} label='Poorly' labelPlacement='bottom' />
                            <FormControlLabel value={'Neutral'} control={<Radio onClick={unclick} />} label='Neutral' labelPlacement='bottom' />
                            <FormControlLabel value={'Well'} control={<Radio onClick={unclick} />} label='Well' labelPlacement='bottom' />
                            <FormControlLabel value={'Very well'} control={<Radio onClick={unclick} />} label='Very well' labelPlacement='bottom' />
                        </RadioGroup>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <BackButton route={'/understanding'} /> {/* Render a custom BackButton component */}
                            <NextButton function={handleClick} endIcon={true} text={'Next'} /> {/* Render a custom NextButton component */}
                        </div>
                    </CardContent>
                </Card>
            </Paper>
        </Grid>
    )

}

export default Support; // Exporting the 'Support' component
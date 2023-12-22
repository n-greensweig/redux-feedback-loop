import { useSelector, useDispatch } from 'react-redux'; // Importing React-Redux hooks for state management
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"; // Importing React Router hook for navigation
import { useState } from "react"; // Importing React hook for managing component state

import { TextField, Grid, Paper, Card, CardContent } from "@mui/material"; // Importing Material-UI components

import BackButton from "../BackButton/BackButton"; // Importing a custom BackButton component
import NextButton from "../NextButton/NextButton"; // Importing a custom NextButton component
import CardTypography from '../CardTypography/CardTypography'; // Importing a custom CardTypography component

import swal from 'sweetalert'; // Importing Sweetalert for displaying alerts

function Name() {

    const history = useHistory(); // Creating a navigation history object

    const storedName = useSelector(state => state.name); // Accessing 'name' property from Redux store

    const [newName, setNewName] = useState(storedName || ''); // Initializing component state for 'newName'

    const dispatch = useDispatch(); // Creating a Redux dispatch function

    const handleClick = (e) => {

        if (newName === '') {
            // Display a warning alert if 'newName' is empty
            swal({
                text: 'Please provide your name!',
                icon: 'warning'
            });
        } else {
            e.preventDefault(); // Prevent the default form submission

            // Dispatch a Redux action with type 'NAME' and 'newName' as payload
            const action = { type: 'NAME', payload: newName };
            dispatch(action);

            // Navigate to the '/feeling' route using the 'history' object
            history.push('/feeling');
        }

    }

    return (
        <>
            <Grid item xs={10} md={6}>
                <Paper elevation={5}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <CardTypography text={'Full name'} /> {/* Render a custom CardTypography component */}
                            <TextField type="text"
                                label='Name'
                                rows={1}
                                onChange={e => setNewName(e.target.value)} // Update 'newName' state on input change
                                defaultValue={newName} // Set the default value of the TextField
                                sx={{ width: '100%' }}
                                style={{ justifyContent: 'center', height: '100%', marginBottom: '5%' }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                <BackButton route={'/'} /> {/* Render a custom BackButton component */}
                                <NextButton function={handleClick} endIcon={true} text={'Next'} /> {/* Render a custom NextButton component */}
                            </div>
                        </CardContent>
                    </Card>
                </Paper>
            </Grid>
        </>
    )

}

export default Name; // Exporting the 'Name' component
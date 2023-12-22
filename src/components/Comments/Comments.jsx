// React/Redux imports
import { useSelector, useDispatch } from 'react-redux'; // Importing React-Redux hooks for state management
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"; // Importing React Router hook for navigation
import { useState } from "react"; // Importing React hook for managing component state

// MUI components
import { TextField, Grid, Paper, Card, CardContent } from "@mui/material"; // Importing Material-UI components

// Personally-created React components
import BackButton from "../BackButton/BackButton"; // Importing a custom BackButton component
import NextButton from "../NextButton/NextButton"; // Importing a custom NextButton component
import CardTypography from '../CardTypography/CardTypography'; // Importing a custom CardTypography component

function Comments() {

    const history = useHistory(); // Creating a navigation history object

    const storedComments = useSelector(state => state.comments); // Accessing 'comments' property from Redux store

    // Comments dispatch
    const dispatch = useDispatch(); // Creating a Redux dispatch function
    const [newComments, setNewComments] = useState(storedComments || ''); // Initializing component state for 'newComments'

    // Function to handle click of 'Next' button
    const handleClick = (e) => {

        e.preventDefault(); // Prevent the default form submission

        // Dispatch a Redux action with type 'COMMENTS' and 'newComments' as payload
        const action = { type: 'COMMENTS', payload: newComments };
        dispatch(action);

        // Navigate to the '/submission' route using the 'history' object
        history.push('/submission');
    };

    return (
        <Grid item xs={10} md={6}>
            <Paper elevation={5}>
                <Card>
                    <CardContent sx={{ textAlign: 'center' }}>
                        <CardTypography text={'Any comments you want to leave?'} /> {/* Render a custom CardTypography component */}
                        <TextField type="text"
                            label='Comments'
                            multiline
                            rows={6}
                            onChange={e => setNewComments(e.target.value)} // Update 'newComments' state on input change
                            defaultValue={newComments}
                            sx={{ width: '100%' }}
                            style={{ justifyContent: 'center', height: '100%', marginBottom: '5%' }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <BackButton route={'/support'} /> {/* Render a custom BackButton component */}
                            <NextButton function={handleClick} endIcon={true} text={'Next'} /> {/* Render a custom NextButton component */}
                        </div>
                    </CardContent>
                </Card>
            </Paper>
        </Grid >
    )

}

export default Comments; // Exporting the 'Comments' component
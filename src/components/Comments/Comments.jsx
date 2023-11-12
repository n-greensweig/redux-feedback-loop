import { TextField } from "@mui/material";
import NextButton from "../NextButton/NextButton";
import { useSelector, useDispatch } from 'react-redux';

function Comments() {

    // Connect local variable to reducers
    const comments = useSelector(store => store.comments);

    // Dispatch
    const dispatch = useDispatch();

    // Function to handle click of 'Next' button
    const handleClick = () => {

        const action = { type: 'COMMENTS' };
        dispatch(action);

    };

    // Add comments dispatch

    return (
        <>
            <h1>Any comments you want to leave?</h1>
            <TextField type="text"
                label='Comments?'
            />
            <NextButton handleClick={handleClick} path={'submission'} />
        </>
    )

}

export default Comments;
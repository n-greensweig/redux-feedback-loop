import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function FeedbackTable() {

    const [responses, setResponses] = useState([]);

    // GET request displaying the existing feedback in an MUI table,
    // with the most recent feedback appearing at the top of the list
    // (sorted by id DESC)
    const getFeedback = () => {
        axios.get('/feedback')
            .then(response => {
                setResponses(response.data);
            })
            .catch(error => {
                console.error(error);
                alert('Something went wrong.')
            });
    }

    useEffect(() => {
        getFeedback();
    }, []);

    return (
        <>
            <h1>Admin</h1>
            <TableContainer component={Paper} style={{margin: '20px', maxHeight: '400px', overflowY: 'auto'}}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Respondent</TableCell>
                            <TableCell>Feeling</TableCell>
                            <TableCell>Understanding</TableCell>
                            <TableCell>Support</TableCell>
                            <TableCell>Comments</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {responses.map(response => (
                            <TableRow>
                                <TableCell>{response.name}</TableCell>
                                <TableCell>{response.feeling}</TableCell>
                                <TableCell>{response.understanding}</TableCell>
                                <TableCell>{response.support}</TableCell>
                                <TableCell>{response.comments}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )

}

export default FeedbackTable;
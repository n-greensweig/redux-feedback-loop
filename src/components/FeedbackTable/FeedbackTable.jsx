import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function FeedbackTable() {

    const [rows, setRows] = useState([]);

    // GET request displaying the existing feedback in an MUI table,
    // with the most recent feedback appearing at the top of the list
    // (sorted by id DESC)
    const getFeedback = () => {
        axios.get('/feedback')
            .then(response => {
                setRows(response.data);
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
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Feeling</TableCell>
                            <TableCell>Understanding</TableCell>
                            <TableCell>Support</TableCell>
                            <TableCell>Comments</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow>
                                <TableCell>{row.feeling}</TableCell>
                                <TableCell>{row.understanding}</TableCell>
                                <TableCell>{row.support}</TableCell>
                                <TableCell>{row.comments}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )

}

export default FeedbackTable;
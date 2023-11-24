import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function FeedbackTable() {

    const dispatch = useDispatch();
    const feedbackList = useSelector(store => store.feedbackList);

    const [sortOrder, setSortOrder] = useState('asc');
    const [sortedColumn, setSortedColumn] = useState('id');

    const columns = [
        { id: 'name', label: 'Respondent' },
        { id: 'feeling', label: 'Feeling' },
        { id: 'understanding', label: 'Understanding' },
        { id: 'support', label: 'Support' },
        { id: 'comments', label: 'Comments' },
    ];

    useEffect(() => {
        dispatch({ type: 'FETCH_FEEDBACK' })
    }, []);

    const handleSort = columnId => {
        const isAsc = sortedColumn === columnId && sortOrder === 'asc';
        setSortOrder(isAsc ? 'desc' : 'asc');
        setSortedColumn(columnId);
    };

    // Sort function
    const sortedResponses = [...feedbackList].sort((a, b) => {

        // Get current column values for  two rows being compared
        const columnAValue = a[sortedColumn]; // Value of columnAValue for row a
        const columnBValue = b[sortedColumn]; // Value of columnBValue for row b

        // Check if value is numeric
        const isNumeric = (value) => !isNaN(parseFloat(value)) && isFinite(value);

        // Check if both values are numeric
        const isNumericA = isNumeric(columnAValue);
        const isNumericB = isNumeric(columnBValue);

        // Compare as numbers if both values are numbers
        if (isNumericA && isNumericB) {

            if (sortOrder === "asc") {
                // Sort ascending
                return parseFloat(columnAValue) - parseFloat(columnBValue);
            } else {
                // Sort descending
                return parseFloat(columnBValue) - parseFloat(columnAValue);
            }

        } else {
            // Compare as strings if both values are strings
            if (typeof columnAValue === "string" && typeof columnBValue === "string") {

                if (sortOrder === "asc") {
                    // Sort ascending
                    return columnAValue.localeCompare(columnBValue);
                } else {
                    // Sort descending
                    return columnBValue.localeCompare(columnAValue);
                }
            } else {
                // Return 0 if value types are different
                return 0;
            }
        }
    });


    return (
        <>
            <h1>Admin</h1>
            <TableContainer component={Paper} style={{ margin: '20px', maxHeight: '400px', overflowY: 'auto' }}>
                <Table stickyHeader aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id}>
                                    <TableSortLabel
                                        active={sortedColumn === column.id}
                                        direction={sortOrder}
                                        onClick={() => handleSort(column.id)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedResponses.map(response => (
                            <TableRow key={response.id}>
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
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function FeedbackTable() {

    const [responses, setResponses] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortedColumn, setSortedColumn] = useState('id');

    const columns = [
        { id: 'name', label: 'Respondent' },
        { id: 'feeling', label: 'Feeling' },
        { id: 'understanding', label: 'Understanding' },
        { id: 'support', label: 'Support' },
        { id: 'comments', label: 'Comments' },
    ];

    // GET request to display feedback sorted by id DESC
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

    const handleSort = columnId => {
        const isAsc = sortedColumn === columnId && sortOrder === 'asc';
        setSortOrder(isAsc ? 'desc' : 'asc');
        setSortedColumn(columnId);
    };

    const sortedResponses = [...responses].sort((a, b) => {

        const columnA = a[sortedColumn];
        const columnB = b[sortedColumn];

        const isNumeric = value => !isNaN(parseFloat(value)) && isFinite(value);

        const isNumericA = isNumeric(columnA);
        const isNumericB = isNumeric(columnB);

        if (isNumericA && isNumericB) {

            if (sortOrder === 'asc') {
                return parseFloat(columnA) - parseFloat(columnB);
            } else {
                return parseFloat(columnB) - parseFloat(columnA);
            }

        } else {
            if (typeof columnA === 'string' && typeof columnB === 'string') {

                if (sortOrder === 'asc') {
                    return columnA.localeCompare(columnB);
                } else {
                    return columnB.localeCompare(columnA);
                }
            } else {
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
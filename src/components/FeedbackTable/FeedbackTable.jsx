// MUI components
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TableSortLabel,
    Button,
    useTheme,
    useMediaQuery
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

// React/Redux imports
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Sweetalert and axios imports
import swal from "sweetalert";
import axios from "axios";

function FeedbackTable() {
    // Initialize Redux dispatch and select feedback data from store
    const dispatch = useDispatch();
    const feedbackList = useSelector(store => store.feedbackList);

    // Initialize local state for editing names
    const storeName = useSelector(store => store.name);
    const [name, setName] = useState(storeName);

    // Initialize state for sorting
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortedColumn, setSortedColumn] = useState('id');

    // Define table columns
    const columns = [
        { id: 'name', label: 'Respondent' },
        { id: 'feeling', label: 'Feeling' },
        { id: 'understanding', label: 'Understanding' },
        { id: 'support', label: 'Support' },
        { id: 'comments', label: 'Comments' },
    ];

    // Fetch feedback data from the server when the component mounts
    useEffect(() => {
        dispatch({ type: 'FETCH_FEEDBACK' })
    }, []);

    // Handle sorting when a column header is clicked
    const handleSort = columnId => {
        const isAsc = sortedColumn === columnId && sortOrder === 'asc';
        setSortOrder(isAsc ? 'desc' : 'asc');
        setSortedColumn(columnId);
    };

    // Sort the feedback responses based on the selected column and order
    const sortedResponses = [...feedbackList].sort((a, b) => {
        const columnAValue = a[sortedColumn];
        const columnBValue = b[sortedColumn];

        // Check if values are numeric
        const isNumeric = (value) => !isNaN(parseFloat(value)) && isFinite(value);
        const isNumericA = isNumeric(columnAValue);
        const isNumericB = isNumeric(columnBValue);

        if (isNumericA && isNumericB) {
            return sortOrder === "asc" ? parseFloat(columnAValue) - parseFloat(columnBValue) : parseFloat(columnBValue) - parseFloat(columnAValue);
        } else {
            return sortOrder === "asc" ? columnAValue.localeCompare(columnBValue) : columnBValue.localeCompare(columnAValue);
        }
    });

    // Delete feedback entry and confirm with a sweet alert
    const deleteFeedback = (id) => {
        const feedbackId = parseInt(id, 10);
        swal({
            title: 'Are you sure',
            text: 'Are you sure you want to delete this feedback item?',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then(willDelete => {
            if (willDelete) {
                swal('Deleted!', 'This feedback has been deleted!', 'success');

                // Send a DELETE request to the server to remove the feedback entry
                axios.delete(`/feedback/${feedbackId}`)
                    .then(response => {
                        dispatch({ type: 'FETCH_FEEDBACK' }); // Fetch updated feedback list
                    })
                    .catch(error => {
                        console.error(error);
                        alert('Something went wrong.');
                    });
            }
        });
    };

    // Update name via a PUT request when it's edited
    const saveEditedName = (e, id) => {
        if (e.target.value !== '' && e.target.value !== name) {
            axios.put(`/feedback/${id}`, {
                name: name,
            })
                .then(response => {
                    dispatch({ type: 'FETCH_FEEDBACK' }); // Fetch updated feedback list
                })
                .catch(error => {
                    console.error(error);
                    alert('Something went wrong.');
                });
            e.currentTarget.blur();
        }
    };

    // Check the screen size for responsive design
    const theme = useTheme();
    const isXsScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
            {/* Table title */}
            <h2 style={{
                margin: '0 auto',
                textAlign: 'center',
                color: '#7a0019',
                marginBottom: '1rem',
                fontSize: '30px',
                fontFamily: 'inter'
            }}>Admin Feedback Table</h2>

            {/* Table container */}
            <TableContainer component={Paper}
                style={{
                    margin: '0 auto',
                    maxHeight: '400px',
                    overflowY: 'auto',
                    width: '90%',
                }}>
                {/* Feedback table */}
                <Table stickyHeader aria-label="simple table">
                    {/* Table header */}
                    <TableHead>
                        <TableRow>
                            {/* Map and render table columns with sorting functionality */}
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id} style={{ padding: isXsScreen || isSmScreen ? 'auto' : '0' }}
                                    sx={{ fontSize: isXsScreen || isSmScreen ? '.5rem' : '.875rem', textAlign: 'left' }}
                                >
                                    <TableSortLabel
                                        active={sortedColumn === column.id}
                                        direction={sortOrder}
                                        onClick={() => handleSort(column.id)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                            {/* Empty cell for delete buttons */}
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    {/* Table body */}
                    <TableBody>
                        {/* Map and render sorted feedback responses */}
                        {sortedResponses.map(response => (
                            <TableRow key={response.id}>
                                {/* Editable name cell */}
                                <TableCell
                                    style={{ padding: '0', paddingLeft: '.5rem' }}
                                    sx={{ fontSize: isXsScreen || isSmScreen ? '.5rem' : '.875rem' }}
                                    contentEditable={true}
                                    suppressContentEditableWarning={true}
                                    value={name}
                                    onInput={e => {
                                        if (e.currentTarget.textContent !== '') {
                                            setName(e.currentTarget.textContent)
                                        }
                                    }}
                                    onBlur={e => saveEditedName(e, response.id)}
                                    onKeyDown={e => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            saveEditedName(e, response.id);
                                        }
                                    }}
                                >{response.name}</TableCell>
                                {/* Feeling cell */}
                                <TableCell style={{ padding: '0' }}
                                    sx={{ fontSize: isXsScreen || isSmScreen ? '.5rem' : '.875rem', textAlign: 'center' }}
                                >{response.feeling}</TableCell>
                                {/* Understanding cell */}
                                <TableCell style={{ padding: '0' }}
                                    sx={{ fontSize: isXsScreen || isSmScreen ? '.5rem' : '.875rem', textAlign: 'center' }}
                                >{response.understanding}</TableCell>
                                {/* Support cell */}
                                <TableCell style={{ padding: '0' }}
                                    sx={{ fontSize: isXsScreen || isSmScreen ? '.5rem' : '.875rem', textAlign: 'center' }}
                                >{response.support}</TableCell>
                                {/* Comments cell */}
                                <TableCell style={{ padding: '0' }}
                                    sx={{ fontSize: isXsScreen || isSmScreen ? '.5rem' : '.875rem', textAlign: 'left' }}
                                >{response.comments}</TableCell>
                                {/* Delete button cell */}
                                <TableCell style={{ padding: '0' }}
                                    sx={{ fontSize: isXsScreen || isSmScreen ? '.5rem' : '.875rem', textAlign: 'center' }}
                                >
                                    {<Button onClick={() => deleteFeedback(response.id)} startIcon={<DeleteIcon style={{ color: 'red' }} />} ></Button>}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer >
        </>
    )
}

export default FeedbackTable; // Exporting the 'FeedbackTable' component
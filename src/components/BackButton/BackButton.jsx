import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function BackButton(props) {

    const history = useHistory();

    return (
        <Button variant='outlined'
            style={{ backgroundColor: 'white', color: '#900021', borderColor: '#900021' }}
            onClick={e => history.push(props.route)}
            startIcon={< ArrowBackIcon />}>Back</Button >
    )

}

export default BackButton;
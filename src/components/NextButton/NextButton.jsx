import { NavigateNext } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function NextButton() {

    const history = useHistory();

    const handleClick = (e) => {
        history.push('/understanding');
    };

    return (
        <Button variant="outlined" onClick={handleClick} startIcon={<NavigateNext />}>Next</Button>
    )

}

export default NextButton;
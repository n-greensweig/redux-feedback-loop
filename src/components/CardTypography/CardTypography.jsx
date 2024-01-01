import { Typography } from "@mui/material";

function CardTypography(props) {
    // Render a Typography component with specified text and styling
    return (
        <Typography style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            fontFamily: 'inter'
        }}
            variant="h5"
            component="div"
            sx={{
                fontWeight: 'bold',
                mb: 2
            }}>{props.text}</Typography>
    )
}

export default CardTypography;
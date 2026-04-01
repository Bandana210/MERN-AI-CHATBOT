import Typography from '@mui/material/Typography';
import React from 'react';
import { Link } from 'react-router-dom';

const Logo=() => {
    return <div style={{
        display: "flex",
        marginRight: "auto",
        alignItems: "center",
        gap: "15%",
        }}>
            <Link to={"/"} ><img src="img4.jpg" alt="Logo" width={"30px"} height={"30px"} className='image-inverted' />
            <Typography sx={{ display:{ xs:"block", md:"block" },
            mr:"auto",
            fontWeight: "600",
            textShadow:"2px 2px 20px #000" }}>

            <span style={{ fontSize:"20px"}}>Chat</span>Bro
            </Typography>
            </Link>
    
    </div>;
};

export default Logo;
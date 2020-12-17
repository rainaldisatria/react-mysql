import React from 'react';
import { Typography, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <Box mt={8}>
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit">
                    Kelompok 4 PBDL UPNVJ
          </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </Box>
    );
}

export default Footer;
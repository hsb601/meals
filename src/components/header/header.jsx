import React from 'react';
import { Box, Typography } from '@mui/material';
import bg  from '../../assets/1.png'

const Header = () => {

  return (
    <Box
      sx={{
        height: '350px',
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        textAlign: 'center',
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgb(241 241 241 / 81%)',
          zIndex: 1,
        },
        '& > *': {
          zIndex: 2,
        },
      }}
    >
      <Typography variant="h3" color="black" fontWeight={600} mb={2} fontSize={45}>
        Optimized Your Meal
      </Typography>
      <Typography variant="subtitle1" fontSize={14} color="black" flexWrap={"wrap"} mx={5}>
        Select Meal to Add in Week. You will be able to edit, modify, and change the Meal Weeks.
      </Typography>
    </Box>
  );
};

export default Header;

import React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';

const WeeksMenu = ({ value, onChange, openModal, selectedRecipe }) => {
  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper', py: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'center' }}>
        <Tabs
          value={value}
          onChange={onChange}
          centered
          TabIndicatorProps={{
            sx: {
              height: 4,
              backgroundColor: '#004370',
              transition: 'transform 0.3s ease' 
            }
          }}
          sx={{
            '.MuiTabs-flexContainer': {
              flexWrap: 'wrap',
              mt: 1
            },
            '.MuiTab-root': {
              fontSize: { xs: '0.6rem', md: '0.8rem' },
              fontWeight: 750,
              fontFamily: 'Sans-serif',
              mx: { xs: -1, md: 1, lg: 4 },
              px: { xs: 0, md: 2 },
              color: "black",
              '&.Mui-selected': {
                color: '#004370',
                fontWeight: 800,
                width: { md: 160 },
                borderBottom: 7,

              },
            },
            '.MuiTabs-root::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: 7,
              backgroundColor: '#004370',
              transition: 'transform 0.3s ease', 
              transform: `translateX(${value * 100}%)`
            },
            position: 'relative'
          }}
        >
          {['All Meals', 'Week 1', 'Week 2', 'Week 3', 'Week 4'].map((label, index) => (
            <Tab key={index} label={label} />
          ))}
        </Tabs>
        <Button
          style={(value === 0 && selectedRecipe.length !== 0) ? { backgroundColor: "#004370", fontWeight: 600, width: 200 } : { backgroundColor: "#9b9b9b", color: "white", fontWeight: 600, width: 200 }}
          variant="contained"
          disabled={(value !== 0 || selectedRecipe.length === 0)}
          onClick={openModal}
          sx={{
            ml: { lg: 15, md: 5 },
            mt: { xs: 2, md: 2 },
            alignSelf: { xs: 'center', md: 'flex-start' }
          }}
        >
          Add to Week
        </Button>
      </Box>
    </Box>
  );
};

export default WeeksMenu;

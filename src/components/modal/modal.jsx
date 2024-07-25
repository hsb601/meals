import React, { useEffect } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const WeekSelectionModal = ({ open, handleClose, handleSave, selectedWeek, setSelectedWeek }) => {
  useEffect(() => {
    if (open && !selectedWeek) {
      setSelectedWeek(1);
    }
  }, [open, selectedWeek, setSelectedWeek]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: {xs: 300, md: 600 }, height: 250, bgcolor: 'background.paper', borderTopLeftRadius: 10, borderTopRightRadius: 10, boxShadow: 24, p: 4,
        textAlign: 'center', 
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: "center"
      }}>
        <Typography variant="h5" component="h5" textAlign="center" fontWeight={"700"} fontSize={30} mb={5}>
          Select Week
        </Typography>
        <Box>
          {[1, 2, 3, 4].map((week) => (
            <Button
              key={week}
              onClick={() => setSelectedWeek(week)}
              style={{
                backgroundColor: selectedWeek === week ? 'skyblue' : 'lightgrey',
                color: 'black',
                margin: 8,
                padding: 10,
                fontSize: 16,
                fontWeight: "600",
                width: 120
              }}
            >
              Week {week}
            </Button>
          ))}
        </Box>
        <Button onClick={handleSave} variant="contained" sx={{ mt: 2, backgroundColor: "#004370", fontWeight: 600, width: 160, fontSize: 12, height: 40 }}>
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default WeekSelectionModal;

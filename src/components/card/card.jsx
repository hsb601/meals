import React from 'react';
import { Card, CardContent, Typography, IconButton, Box, Stack, Tooltip } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import GradeIcon from '@mui/icons-material/Grade';

const MealCard = ({ recipe, isSelected, onToggleSelect, onDelete, activeWeek }) => {
  const handleClick = () => {
    onToggleSelect(recipe); 
  };

  const handleDelete = (event) => {
    event.stopPropagation(); 
    onDelete(recipe); 
  };

  const renderRatingStars = (rating) => {
    const stars = [];
    for (let i = 0; i < Math.floor(rating); i++) {
      stars.push(<GradeIcon key={i} style={{ color: "#004370", marginLeft: 2, fontSize: 'small' }} />);
    }
    return stars;
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: 3,
        boxShadow: 3,
        position: 'relative',
        margin: 3,
        cursor: 'pointer',
        borderColor: isSelected ? '#004370' : 'transparent',
        borderWidth: isSelected ? 3 : 0,
        borderStyle: 'solid'
      }}
      onClick={handleClick}
    >
      <Stack justifyContent="center" alignItems="center" mt={4}>
        <img src={recipe.image} alt={recipe.id} style={{ borderRadius: 15, width: 290, height: 250 }} />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            position: 'absolute',
            top: (activeWeek !== 0) ? 40 : 50,
            width: '79%',
            px: 2
          }}
        >
          {activeWeek !== 0 ? 
            <IconButton
              aria-label="delete"
              sx={{ backgroundColor: '#ffe0e0', borderRadius: 0, height: 30, width: 30 }}
              onClick={handleDelete}
            >
              <DeleteOutlineIcon style={{ color: "#e91c3d" }} />
            </IconButton>
          :
          <div></div>
        }
          <Typography
            variant="body2"
            fontSize={12}
            fontWeight={600}
            color="white"
            component="span"
            bgcolor={"black"}
            marginTop={-1}
            px={3}
            borderRadius={1}
          >
            {recipe.mealType}
          </Typography>
        </Stack>
      </Stack>
      <CardContent sx={{ mx: 1 }}>
        <Tooltip title={recipe.name} arrow>
          <Typography
            gutterBottom
            variant="h5"
            fontWeight={800}
            fontSize={20}
            component="div"
            sx={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {recipe.name}
          </Typography>
        </Tooltip>
        <Tooltip title={recipe.instructions} arrow>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              WebkitLineClamp: 7,
              textOverflow: 'ellipsis',
              maxHeight: 300
            }}
          >
            {recipe.instructions}
          </Typography>
        </Tooltip>
        <Stack justifyContent="space-between" flexDirection="row" my={2}>
          <Box>
            <Typography variant="body2" color="text.primary" component="span" fontWeight={800}>
              Cuisine:
            </Typography>
            <Tooltip title={recipe.cuisine} arrow>
              <Typography
                variant="body2"
                color="text.primary"
                component="span"
                sx={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  maxWidth: 80,
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  marginTop: -0.2
                }}
              >
                &nbsp;{recipe.cuisine}
              </Typography>
            </Tooltip>
          </Box>
          <Box marginTop={0.3}>
            <Typography variant="body2" color="text.primary" component="span" fontWeight={800} display="flex" alignItems="center">
              Rating: &nbsp;
              <Typography variant="body2" color="text.primary" component="span">
                {recipe.rating}
              </Typography>
              {renderRatingStars(recipe.rating)}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default MealCard;

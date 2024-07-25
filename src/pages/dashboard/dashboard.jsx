import React, { useEffect, useState } from "react";
import { Stack, Box, Typography } from "@mui/material";
import MealCard from "../../components/card/card";
import Header from "../../components/header/header";
import WeeksMenu from "../../components/weekMenu/menu";
import WeekSelectionModal from "../../components/modal/modal";

const Dashboard = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [activeWeek, setActiveWeek] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [weekData, setWeekData] = useState([]);
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://dummyjson.com/recipes");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setRecipes(data.recipes);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchWeekData = () => {
      const data = JSON.parse(localStorage.getItem('Week')) || [];
      setWeekData(data);
    };

    fetchRecipes();
    fetchWeekData();
  }, []);

  const handleToggleSelect = (recipe) => {
    setSelectedRecipes((prevSelected) => {
      if (prevSelected.find((r) => r.id === recipe.id)) {
        return prevSelected.filter((r) => r.id !== recipe.id);
      } else {
        return [...prevSelected, recipe];
      }
    });
  };

  const handleWeekChange = (event, newValue) => {
    setActiveWeek(newValue);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSave = () => {
    const existingData = JSON.parse(localStorage.getItem('Week')) || [];

    const newRecipes = selectedRecipes.map((recipe) => ({
      ...recipe,
      week: selectedWeek
    })).filter(newRecipe => {
      const isAlreadyAdded = existingData.some(existingRecipe =>
        existingRecipe.id === newRecipe.id && existingRecipe.week === newRecipe.week
      );
      if (isAlreadyAdded) {
        alert(`The meal "${newRecipe.name}" is already added to Week ${newRecipe.week}.`);
      }
      return !isAlreadyAdded;
    });

    if (newRecipes.length > 0) {
      const updatedData = [...existingData, ...newRecipes];
      localStorage.setItem('Week', JSON.stringify(updatedData));
      setWeekData(updatedData);
      alert(`The ${newRecipes.length} new meal has been added to Week ${selectedWeek}.`);
    } else {
      alert('No new meals were added.');
    }

    closeModal();
  };

  const handleDelete = (recipe) => {
    const existingData = JSON.parse(localStorage.getItem('Week')) || [];
    const updatedData = existingData.filter(item => !(item.id === recipe.id && item.week === recipe.week));

    localStorage.setItem('Week', JSON.stringify(updatedData));
    setWeekData(updatedData);
  };

  const filteredRecipes = activeWeek === 0 
    ? recipes 
    : weekData.filter(recipe => recipe.week === activeWeek);

  if (loading) {
    return <div style={{ justifyContent: "center", alignItems: "center" }}>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Header />
      <Box>
        <Typography gutterBottom variant="h1" component="div" fontWeight={600} sx={{ fontSize: { xs: 30, md: 30 }, my: 5, ml: "15%" }}>
          Week Orders
        </Typography>
        <WeeksMenu value={activeWeek} onChange={handleWeekChange} openModal={openModal} selectedRecipe={selectedRecipes} />
        <Stack direction="row" flexWrap="wrap" justifyContent="center" sx={{ mt: 4 }}>
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <MealCard
                key={recipe.id}
                recipe={recipe}
                isSelected={selectedRecipes.some((selectedRecipe) => selectedRecipe.id === recipe.id)}
                onToggleSelect={handleToggleSelect}
                onDelete={handleDelete}
                activeWeek={activeWeek}
              />
            ))
          ) : (
            <Box sx={{ width: '100%', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h5" component="h5" color="#004370" fontWeight={800}>
                No data to show
              </Typography>
            </Box>
          )}
        </Stack>
        <WeekSelectionModal
          open={modalOpen}
          handleClose={closeModal}
          handleSave={handleSave}
          selectedWeek={selectedWeek}
          setSelectedWeek={setSelectedWeek}
        />
      </Box>
    </div>
  );
};

export default Dashboard;

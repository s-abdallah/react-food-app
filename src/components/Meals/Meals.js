import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealList from "./MealList";
import useFetch from "../../hooks/use-fetch";
import Button from "../UI/Button";
import MealModal from "./MealModal";

const fireBaseURL = "??";

const Meals = (props) => {
  const { loading, error, connectHTTP: loadMealsHandler } = useFetch();
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    let meals = [];
    const dataCallback = (obj) => {
      for (const key in obj) {
        const newItem = {
          id: key,
          title: obj[key]["title"],
          description: obj[key]["description"],
          price: obj[key]["price"],
        };
        meals.push(newItem);
      }
      setMeals(meals);
    };

    loadMealsHandler({ url: fireBaseURL }, dataCallback);
  }, [loadMealsHandler]);

  const [showAddMeal, setShowAddMeal] = useState(false);
  const addMealHandler = (event) => {
    event.preventDefault();
    setShowAddMeal(true);
  };
  const closeModalHandler = (event) => {
    setShowAddMeal(false);
  };

  const items = meals.map((item) => (
    <MealList
      key={item.id}
      id={item.id}
      title={item.title}
      excerpt={item.description}
      price={+item.price}
    />
  ));

  return (
    <Card className="meals">
      {error && <Button onClick={addMealHandler}> Add Meal </Button>}

      {error && <p className="error"> {error} </p>}

      {loading && <p className="loading"> Loading... </p>}

      {showAddMeal && <MealModal onClose={closeModalHandler} />}

      <ul className="meals_list">{items}</ul>
    </Card>
  );
};

export default Meals;

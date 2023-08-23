import React from "react";
import Card from "../UI/Card";
import MealList from "./MealList";

let FOOD_LIST = [
  {
    id: Math.random().toString(),
    title: "Lobster Roll",
    description: "A quintessential Boston dish",
    cost: 22.99,
  },
  {
    id: Math.random().toString(),
    title: "Clam Chowder",
    description: "A creamy New England clam chowder",
    cost: 12.99,
  },
  {
    id: Math.random().toString(),
    title: "Fried Clams",
    description: "A plate of crispy fried clams",
    cost: 18.99,
  },
];

const Meals = (props) => {

  const items = FOOD_LIST.map((item) => (
    <MealList
      key={item.id}
      id={item.id}
      title={item.title}
      excerpt={item.description}
      cost={item.cost}
    />
  ));

  return (
    <Card className="meals">
      <ul className="meals_list">{items}</ul>
    </Card>
  );
};

export default Meals;

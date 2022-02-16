import React, { useCallback, useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem";
import Card from "../UI/Card/Card";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMealsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://react-http-e8bf2-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch http req");
      }

      const data = await response.json();

      const MEALS = [];
      for (const id in data) {
        MEALS.push({
          id: id,
          ...data[id],
        });
      }
      setMeals(MEALS);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => fetchMealsHandler(), [fetchMealsHandler]);

  // const cartCtx = useContext(CartContext);

  // cartCtx.items = DUMMY_MEALS;

  const mealList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    ></MealItem>
  ));

  let content = <p>No meals</p>;

  if (meals.length > 0) {
    content = <ul>{mealList}</ul>;
  }

  if (error) {
    content = error;
  }

  if (isLoading) {
    content = <p>Loading....</p>;
  }

  return (
    <section className={classes.meals}>
      <Card>{content}</Card>
    </section>
  );
};

export default AvailableMeals;

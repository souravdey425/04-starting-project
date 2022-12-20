import React, { Fragment } from "react";
import AvailableMeals from "./AvailableMeals";
import MealsSummry from "./MealsSummry";

const Meals = () => {
  return (
    <Fragment>
      <MealsSummry />
      <AvailableMeals />
    </Fragment>
  );
};

export default Meals;

import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./Available.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [mealsFetch, setMealsFetch] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://food-order-5772a-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("Something Wents Wrong");
      }
      const Responsedata = await response.json();
      const responseStore = [];
      for (const key in Responsedata) {
        responseStore.push({
          id: key,
          name: Responsedata[key].name,
          description: Responsedata[key].description,
          price: Responsedata[key].price,
        });
      }
      setMealsFetch(responseStore);
      setIsloading(false);
    };

    fetchMeals().catch((error) => {
      setIsloading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isloading) {
    return (
      <section className={classes.isLoading}>
        <p>Loading.....</p>
      </section>
    );
  }
  if (httpError) {
    return (
      <section className={classes.isLoading}>
        <p>{httpError}</p>
      </section>
    );
  }

  const array = mealsFetch.map((index) => (
    <MealItem
      id={index.id}
      key={index.id}
      Name={index.name}
      description={index.description}
      price={index.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{array}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;

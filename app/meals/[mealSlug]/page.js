import Image from "next/image";
import { notFound } from "next/navigation";

import {getMeal, getMeals} from "@/lib/meals";

import classes from "./page.module.css";

export const revalidate = 10;

export async function generateMetadata({ params }) {
  const meal = getMeal(params.mealSlug);

  if (!meal) notFound();

  return { title: meal.title, description: meal.summary };
}

export default function MealDetailsPage({ params }) {
  const meal = getMeal(params.mealSlug);
  if (!meal) notFound();

  const instructionsFormatted = meal.instructions.replace(/\n/g, "<br />");
  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image fill src={meal.image} alt={meal.title} />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{ __html: instructionsFormatted }}
        />
      </main>
    </>
  );
}
export const dynamicParams = true;

export async function generateStaticParams() {
  const meals = await getMeals();
  return meals.map((meal) => ({
    mealSlug: meal.slug,
  }));
}

"use server";
import { redirect } from "next/navigation";

import { createMeal } from "@/lib/meals";
import { revalidatePath } from "next/cache";

function isInvalidText(text) {
  return !(text && text.trim());
}

export async function shareMeal(presState, formData) {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: "Invalid input",
    };
  }

  await createMeal(meal);
  // MUST-DO FOR UPDATING DATA IN PRODUCTION
  // revalidates the page (without nested pages)
  revalidatePath("/meals"); //the-same-as: revalidatePath('/meals','page')
  // revalidates the page with nested pages
  // revalidatePath('/meals','layout')

  redirect("/meals");
}

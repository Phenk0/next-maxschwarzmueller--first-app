const fs = require("node:fs");
const db = require("better-sqlite3")("meals.db");
const slugify = require("slugify");
const xss = require("xss");

db.pragma("journal_mode = WAL");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // throw new Error("Failed to fetch meals data");
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function createMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}-${Date.now()}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Failed to save image");
    }
  });

  meal.image = `/images/${fileName}`;

  db.prepare(
    `
  INSERT INTO meals
    (title, summary, instructions, creator, creator_email, image, slug)
  VALUES (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)
  `,
  ).run(meal);
}

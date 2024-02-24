function MealSlugPage({ params }) {
  return (
    <>
      <h1>{params.mealSlug.split("-").join(" ").toUpperCase()}</h1>
    </>
  );
}

export default MealSlugPage;

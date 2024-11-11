import useHttp from "../hooks/useHttp";
import ErrorComp from "./ErrorComp";
import MealItem from "./MealItem";
const requestConfig = { method: "GET" };
export default function Meals() {
  const {
    error,
    data: meals,
    isLoading,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  if (isLoading) {
    return <p className="center">Fetching the Meals...</p>;
  }

  if (error) {
    return (
      <ErrorComp
        title={"Failed To Fetch Meals"}
        message={error || "please try again later"}
      />
    );
  }

  return (
    <ul id="meals">
      {isLoading && <p>Fetching Meals...</p>}
      {meals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}

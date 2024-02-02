import { useState, useEffect } from "react";
import { initMDB, Ripple } from "mdb-ui-kit";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import { Link, useNavigate } from "react-router-dom";
import { DELETE_RECIPE } from "../utils/mutations";
import './style.css';

import Auth from "../utils/auth";

initMDB({ Ripple });

import FamilyCards from "../components/FamilyCards";

function Dashboard() {
  const username = Auth.getProfile().authenticatedPerson.username;

  const { loading, error, data } = useQuery(QUERY_USER, {
    variables: { username: username },
  });

  const [deleteRecipe] = useMutation(DELETE_RECIPE, {
    refetchQueries: [{ query: QUERY_USER, variables: { username: username } }],
  });

  const navigate = useNavigate();

  const handleEditRecipe = async (recipeId) => {
    navigate(`/editrecipe/${recipeId}`);
  };

  const [recipes, setRecipes] = useState([]);

  const handleDeleteRecipe = async (recipeId) => {
    try {
      // Send a mutation to delete the recipe
      await deleteRecipe({
        variables: { id: recipeId },
      });

      // Update the state to remove the deleted recipe
      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe._id !== recipeId)
      );
      location.reload();
      console.log("Recipe deleted successfully!");
    } catch (error) {
      console.error("Error deleting recipe:", error);
      // Handle error as needed
    }
  };


  useEffect(() => {
    if (data && data.user && data.user.recipes) {
      setRecipes(data.user.recipes);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;

  if (error) {
    console.error("Error fetching data:", error);
    return <p>Error: Unable to fetch data</p>;
  }

  return (
    <>
      {/* Family */}
      <section className="md-container m-auto" id="dashboard-families">
        <div className="d-flex p-3 flex-wrap" id="cardContainer">
          <FamilyCards />
        </div>
      </section>

      {/* Added Recipe */}
      <div className="d-flex p-3 flex-wrap" id="cardContainer">
      <section className="container m-auto justify-content-between d-flex flex-wrap pb-4">
        <h2>Your Recipes</h2>
        <div>
          <Link
            to={`/addrecipe/`}
            className="btn"
            data-mdb-ripple-init
          >
            Add New Recipe
          </Link>
        </div>
      </section>
      <>
          {recipes.length !== 0 ? (
            <>
              {recipes.map((recipe) => (
                <div className="card mb-4" key={recipe._id}>
                  <div
                    className="bg-image hover-overlay"
                    data-mdb-ripple-init
                    data-mdb-ripple-color="light"
                  >
                    <img
                      src={recipe?.photo || ""}
                      className="img-fluid mb-0"
                      alt={recipe?.name || ""}
                    />
                    <a href="#!">
                      <div
                        className="mask"
                        style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                      ></div>
                    </a>
                  </div>
                  <div className="card-body pt-1 pb-3">
                    <h5 className="card-title mb-2">
                      {recipe?.name || "No Title"}
                    </h5>
                    <Link
                      to={`/recipe/${recipe?._id}`}
                      className="btn"
                      data-mdb-ripple-init
                    >
                      See Recipe
                    </Link>
                    <button
                      className="btn"
                      onClick={() => handleEditRecipe(recipe._id)}
                      data-mdb-ripple-init
                    >
                      Edit
                    </button>
                    <button
                      className="btn"
                      data-mdb-ripple-init
                      onClick={() => handleDeleteRecipe(recipe._id)}
                    >
                      Delete Recipe
                    </button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p>You have not added any recipes yet</p>
          )}
        </>
      </div>
    </>
  );
}

export default Dashboard;

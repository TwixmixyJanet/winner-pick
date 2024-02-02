import { useState, useEffect } from "react";
import { initMDB, Ripple } from "mdb-ui-kit";
import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ALL_RECIPES } from "../utils/queries";
import {  Link } from "react-router-dom";
import Auth from '../utils/auth';
import './style.css';

initMDB({ Ripple });

function PinnedRecipes() {
    const username = Auth.getProfile().authenticatedPerson.username;
    const userData = useQuery(QUERY_USER, {variables: { username: username }, });
    const recipeData = useQuery(QUERY_ALL_RECIPES);
    const [pinnedRecipes, setPinnedRecipes] = useState([]);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        let pinnedRecipeIds = [];
        if (!userData.loading && userData.data && userData.data.user && userData.data.user.pinnedRecipes) {
            if(userData.data.user.pinnedRecipes.length){
                for (let i = 0; i < userData.data.user.pinnedRecipes.length; i++){
                    pinnedRecipeIds.push(userData.data.user.pinnedRecipes[i]._id)
                }
                setPinnedRecipes(pinnedRecipeIds);
            }
        }
    },[userData.data, userData.loading, userData.error]);

    useEffect(() => {
        let pinnedRecipeDetails = [];
        if (!recipeData.loading && recipeData.data && recipeData.data.recipes && pinnedRecipes.length) {
            for (let i = 0; i < pinnedRecipes.length; i++){
                pinnedRecipeDetails.push(recipeData.data.recipes.find((recipe) => recipe._id === pinnedRecipes[i]))
            }
            setRecipes(pinnedRecipeDetails);
            console.log(pinnedRecipeDetails);
        }
    }, [recipeData, recipeData.loading, recipeData.data, pinnedRecipes])

  if (userData.loading) return <p>Loading...</p>;

  return (
    <>
      <h2 className="text-center mt-3 mb-0">Pinned Recipes</h2>
      <section className="md-container m-auto" id="family-recipes">
        {recipes.length !==0 ? (
          <div className="d-flex p-3 flex-wrap" id="cardContainer">
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
                  <div className="card-body p-3">
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
                  </div>
                </div>
              ))}</div>) : <div className="text-center">You have no recipes pinned yet!</div>}
      </section>
    </>
  );
}

export default PinnedRecipes;
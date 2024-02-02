import { useState, useEffect } from 'react';
import { initMDB, Ripple } from 'mdb-ui-kit';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_RECIPES } from '../../utils/queries';
import { Link } from 'react-router-dom';

initMDB({ Ripple });


const RecipeCard = () => {
  const { loading, error, data } = useQuery(QUERY_ALL_RECIPES);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (data && data.recipes) {
      setRecipes(data.recipes);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;

  if (error) {
    console.error('Error fetching data:', error);
    return <p>Error: Unable to fetch data</p>;
  }

  return (
    <>
      {recipes.map((recipe) => (
        <div className="card mb-4" key={recipe._id}>
          <div className="bg-image hover-overlay" data-mdb-ripple-init data-mdb-ripple-color="light">
            <img src={recipe?.photo || ''} className="img-fluid mb-0" alt={recipe?.name || ''} />
            <a href="#!">
              <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}></div>
            </a>
          </div>
          <div className="card-body p-3">
            <h5 className="card-title mb-2">{recipe?.name || 'No Title'}</h5>
            <Link to={`/recipe/${recipe?._id}`} className="btn" data-mdb-ripple-init>
              See Recipe
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default RecipeCard;
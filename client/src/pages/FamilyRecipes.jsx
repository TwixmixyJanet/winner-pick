import { useState, useEffect } from "react";
import { initMDB, Ripple } from "mdb-ui-kit";
import { useQuery } from "@apollo/client";
import { QUERY_FAMILY_RECIPE, QUERY_FAMILY, QUERY_FAMILY_MEMBER } from "../utils/queries";
import { useParams, Link } from "react-router-dom";
import './style.css';

initMDB({ Ripple });

function FamilyRecipes() {
  const { familyId } = useParams();
  const { loading, error, data } = useQuery(QUERY_FAMILY_RECIPE, {
    variables: { familyId: familyId },
  });
  const familyData = useQuery(QUERY_FAMILY, {
    variables: { id: familyId }, 
  });
  const familyMemberData = useQuery(QUERY_FAMILY_MEMBER, {
    variables: { familyId: familyId }
  });

  const [recipes, setRecipes] = useState([]);
  const [familydata, setFamilyData] = useState('');
  const [familymembers, setFamilyMemeberData] = useState('');

  useEffect(() => {
    if (!loading && data && data.famRecipe) {
      setRecipes(data.famRecipe);
    } else if (!loading && error) {
      console.error("Error fetching data:", error);
    }
  }, [data, loading, error]);

  useEffect(() => {
    if (familyData && familyData.data && familyData.data.family ) {
      setFamilyData(familyData.data.family);
    } else if (!familyData.loading && familyData.error) {
      console.error("Error fetching data:", familyData.error);
    }
  }, [familyData, familyData.data, familyData.loading, familyData.error]);

  useEffect(() => {
    if (familyMemberData && familyMemberData.data && familyMemberData.data.familyMembers) {
      setFamilyMemeberData(familyMemberData.data.familyMembers);
    } else if (!familyMemberData.loading && familyMemberData.error) {
      console.error("Error fetching data:", familyMemberData.error);
    }
  }, [familyMemberData]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <h2 className="text-center mt-3 mb-0">Recipes of family {familydata?.name || ""}</h2>
      <p className="text-center"><small>(<b>Family ID:</b> {familydata?._id || ""})</small></p>
      <h4 className="text-center">Members in this family</h4>
      <section className="d-flex justify-content-center text-center">
      {familymembers.length !==0 ? (
        <ul className="list-group lst-group-light">
          {familymembers.map((member) => (
              <li className="list-group-item d-flex justify-content-between align-items-start" key={member._id}>
              <div className="ms-2 me-auto">
                <div className="fw-bold">{member.username}</div>
                {member.lastName} {member.firstName}
              </div>
            </li>
          ))}
        </ul>) : <div></div>}
      </section>
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
              ))}</div>) : <div className="text-center">There is no recipe added to this family yet!</div>}
      </section>
    </>
  );
}

export default FamilyRecipes;

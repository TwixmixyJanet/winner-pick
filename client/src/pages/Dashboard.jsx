import { useState, useEffect } from "react";
import { initMDB, Ripple } from "mdb-ui-kit";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import { Link, useNavigate } from "react-router-dom";
import { DELETE_GAME } from "../utils/mutations";
import "./style.css";

import Auth from "../utils/auth";

initMDB({ Ripple });

import GroupCards from "../components/GroupCards";

function Dashboard() {
  const username = Auth.getProfile().authenticatedPerson.username;

  const { loading, error, data } = useQuery(QUERY_USER, {
    variables: { username: username },
  });

  const [deleteGame] = useMutation(DELETE_GAME, {
    refetchQueries: [{ query: QUERY_USER, variables: { username: username } }],
  });

  const navigate = useNavigate();

  const handleEditGame = async (gameId) => {
    navigate(`/editgame/${gameId}`);
  };

  const [games, setGames] = useState([]);

  const handleDeleteGame = async (gameId) => {
    try {
      // Send a mutation to delete the game
      await deleteGame({
        variables: { id: gameId },
      });

      // Update the state to remove the deleted game
      setGames((prevGames) => prevGames.filter((game) => game._id !== gameId));
      location.reload();
      console.log("Game deleted successfully!");
    } catch (error) {
      console.error("Error deleting game:", error);
      // Handle error as needed
    }
  };

  useEffect(() => {
    if (data && data.user && data.user.games) {
      setGames(data.user.games);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;

  if (error) {
    console.error("Error fetching data:", error);
    return <p>Error: Unable to fetch data</p>;
  }

  return (
    <>
      {/* Group */}
      <section className="md-container m-auto" id="dashboard-groups">
        <div className="d-flex p-3 flex-wrap" id="cardContainer">
          <GroupCards />
        </div>
      </section>

      {/* Added Game */}
      <div className="d-flex p-3 flex-wrap" id="cardContainer">
        <section className="container m-auto justify-content-between d-flex flex-wrap pb-4">
          <h2>Your Games</h2>
          <div>
            <Link to={`/addgame/`} className="btn" data-mdb-ripple-init>
              Add New Game
            </Link>
          </div>
        </section>
        <>
          {games.length !== 0 ? (
            <>
              {games.map((game) => (
                <div className="card mb-4" key={game._id}>
                  <div
                    className="bg-image hover-overlay"
                    data-mdb-ripple-init
                    data-mdb-ripple-color="light"
                  >
                    <img
                      src={game?.photo || ""}
                      className="img-fluid mb-0"
                      alt={game?.name || ""}
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
                      {game?.name || "No Title"}
                    </h5>
                    <Link
                      to={`/game/${game?._id}`}
                      className="btn"
                      data-mdb-ripple-init
                    >
                      See Game
                    </Link>
                    <button
                      className="btn"
                      onClick={() => handleEditGame(game._id)}
                      data-mdb-ripple-init
                    >
                      Edit
                    </button>
                    <button
                      className="btn"
                      data-mdb-ripple-init
                      onClick={() => handleDeleteGame(game._id)}
                    >
                      Delete Game
                    </button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p>You have not added any games yet</p>
          )}
        </>
      </div>
    </>
  );
}

export default Dashboard;

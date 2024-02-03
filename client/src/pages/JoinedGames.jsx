import { useState, useEffect } from "react";
import { initMDB, Ripple } from "mdb-ui-kit";
import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ALL_GAMES } from "../utils/queries";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import "./style.css";

initMDB({ Ripple });

function JoinedGames() {
  const username = Auth.getProfile().authenticatedPerson.username;
  const userData = useQuery(QUERY_USER, { variables: { username: username } });
  const gameData = useQuery(QUERY_ALL_GAMES);
  const [joinedGames, setJoinedGames] = useState([]);
  const [games, setGames] = useState([]);

  useEffect(() => {
    let joinedGameIds = [];
    if (
      !userData.loading &&
      userData.data &&
      userData.data.user &&
      userData.data.user.joinedGames
    ) {
      if (userData.data.user.joinedGames.length) {
        for (let i = 0; i < userData.data.user.joinedGames.length; i++) {
          joinedGameIds.push(userData.data.user.joinedGames[i]._id);
        }
        setJoinedGames(joinedGameIds);
      }
    }
  }, [userData.data, userData.loading, userData.error]);

  useEffect(() => {
    let joinedGameDetails = [];
    if (
      !gameData.loading &&
      gameData.data &&
      gameData.data.games &&
      joinedGames.length
    ) {
      for (let i = 0; i < joinedGames.length; i++) {
        joinedGameDetails.push(
          gameData.data.games.find((game) => game._id === joinedGames[i])
        );
      }
      setGames(joinedGameDetails);
      console.log(joinedGameDetails);
    }
  }, [gameData, gameData.loading, gameData.data, joinedGames]);

  if (userData.loading) return <p>Loading...</p>;

  return (
    <>
      <h2 className="text-center mt-3 mb-0">Games</h2>
      <section className="md-container m-auto" id="group-games">
        {games.length !== 0 ? (
          <div className="d-flex p-3 flex-wrap" id="cardContainer">
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
                <div className="card-body p-3">
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
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">You have no games yet!</div>
        )}
      </section>
    </>
  );
}

export default JoinedGames;

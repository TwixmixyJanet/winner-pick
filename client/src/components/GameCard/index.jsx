import { useState, useEffect } from "react";
import { initMDB, Ripple } from "mdb-ui-kit";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_GAMES } from "../../utils/queries";
import { Link } from "react-router-dom";

initMDB({ Ripple });

const GameCard = () => {
  const { loading, error, data } = useQuery(QUERY_ALL_GAMES);
  const [games, setGames] = useState([]);

  useEffect(() => {
    if (data && data.games) {
      setGames(data.games);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;

  if (error) {
    console.error("Error fetching data:", error);
    return <p>Error: Unable to fetch data</p>;
  }

  return (
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
          <div className="card-body p-3">
            <h5 className="card-title mb-2">{game?.name || "No Title"}</h5>
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
    </>
  );
};

export default GameCard;

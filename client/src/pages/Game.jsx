/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";

import { QUERY_GAME, QUERY_USER } from "../utils/queries";
import { JOIN_GAME, LEAVE_GAME } from "../utils/mutations";
import "./style.css";
import Auth from "../utils/auth";

function Game() {
  const { id: gameId } = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState({});
  const [group, setGroup] = useState({});
  const loggedIn = Auth.loggedIn();
  const [joined, setJoined] = useState(false);

  const [joinGame] = useMutation(JOIN_GAME);
  const [leaveGame] = useMutation(LEAVE_GAME);

  const { loading, data, error } = useQuery(QUERY_GAME, {
    variables: { id: gameId },
  });

  useEffect(() => {
    if (data) {
      setGame(data.game);
    }
  }, [data, loading, error]);

  useEffect(() => {
    if (data && data.game && data.game.groups && data.game.groups.name) {
      setGroup(data.game.groups);
    }
  }, [data, loading, error]);

  const handleReturnToGames = () => {
    // Use the navigate function to navigate back
    navigate(-1); // This is equivalent to navigating back one step
  };

  const [getUser, userData] = useLazyQuery(QUERY_USER);

  useEffect(() => {
    if (loggedIn) {
      getUser({
        variables: { username: Auth.getProfile().authenticatedPerson.username },
      });
    }
  }, [data, loggedIn, getUser]);

  useEffect(() => {
    if (
      userData &&
      userData.data &&
      userData.data.user &&
      userData.data.user.joinedGames
    ) {
      if (userData.data.user.joinedGames.find((game) => game._id === gameId)) {
        setJoined(true);
      }
    }
  }, [userData, gameId]);

  const joinHandler = async () => {
    const { data } = await joinGame({
      variables: { id: gameId },
    });
    setJoined(true);
  };

  const leaveHandler = async () => {
    const { data } = await leaveGame({
      variables: { id: gameId },
    });
    setJoined(false);
  };

  return (
    <>
      {game ? (
        <div>
          <div className="m-4 d-flex justify-content-center align-items-center">
            <div className="card w-75">
              <img
                src={game.photo}
                alt={game.name}
                className="card-img-top"
                id="game-image"
              />
              <div className="card-body">
                <h1 className="card-title mb-5 mt-3">{game.name}</h1>
                <div className="card-text mb-5">
                  <div className="row">
                    <div className="col-md-6 mb-1">
                      <div className="field-title m-0">Description:</div>{" "}
                      {game.description}
                    </div>
                    <div className="col-md-6 mb-1">
                      <div className="field-title m-0">Cast Members:</div>{" "}
                      {game.castMembers}
                    </div>
                    <div className="col-md-6 mt-5 mb-2">
                      <div className="field-title m-0  d-flex text-start">
                        Number of Members:{" "}
                      </div>
                      <div className="textwrap d-flex text-start">
                        {game.numMembers}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <div className="row">
                    <div className="col m-auto p-1">
                      <Link to={`/groupgames/${group?._id}`}>
                        <div className="badge group-badge p-auto m-2">
                          <i className="fas fa-users fa-lg m-2"></i>
                          <p className=" m-0">Group: {group?.name || ""}</p>
                        </div>
                      </Link>
                    </div>
                    <div className="col m-auto p-1">
                      <div className="badge author-badge p-auto m-2">
                        <i className="fas fa-user fa-lg m-2"></i>
                        <p className=" m-0">Author: {game.author}</p>
                      </div>
                    </div>
                    <div className="col m-auto p-1">
                      <div>
                        {loggedIn !== false ? (
                          <>
                            {joined !== false ? (
                              <div
                                className="badge badge-light p-auto"
                                onClick={leaveHandler}
                              >
                                <i
                                  className="fa-solid fa-thumbtack fa-2x p-auto"
                                  style={{ color: "#da6d44" }}
                                ></i>
                              </div>
                            ) : (
                              <div
                                className="badge badge-light p-auto"
                                onClick={joinHandler}
                              >
                                <i
                                  className="fa-solid fa-thumbtack fa-2x p-auto"
                                  style={{ color: "#e4b54b" }}
                                ></i>
                              </div>
                            )}
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="m-4">
            <Link to="/">
              <div
                className="badge bg-secondary"
                onClick={handleReturnToGames}
                style={{ cursor: "pointer" }}
              >
                <i className="fas fa-arrow-left-long"></i> Return to Games
              </div>
            </Link>
          </div>
        </div>
      ) : null}
      {loading ? <div>Loading...</div> : null}
    </>
  );
}

export default Game;

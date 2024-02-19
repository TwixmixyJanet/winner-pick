/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";

import { QUERY_GAME, QUERY_USER, QUERY_GROUP_MEMBER } from "../utils/queries";
import {
  JOIN_GAME,
  LEAVE_GAME,
  ADD_CAST_MEMBER_TO_USER_ROSTER,
  REMOVE_CAST_MEMBER_FROM_USER_ROSTER,
} from "../utils/mutations";
import "./style.css";
import Auth from "../utils/auth";

function Game() {
  const { id: gameId } = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState({});
  const [group, setGroup] = useState({});
  const [selectedUsers, setSelectedUsers] = useState({});
  const loggedIn = Auth.loggedIn();
  const [joined, setJoined] = useState(false);

  const [joinGame] = useMutation(JOIN_GAME);
  const [leaveGame] = useMutation(LEAVE_GAME);
  const [roster, setRoster] = useState([]);
  const [addCastMemberToUserRoster] = useMutation(
    ADD_CAST_MEMBER_TO_USER_ROSTER
  );
  const [removeCastMemberToUserRoster] = useMutation(
    REMOVE_CAST_MEMBER_FROM_USER_ROSTER
  );

  const { loading, data, error } = useQuery(QUERY_GAME, {
    variables: { id: gameId },
  });

  const {
    loading: groupMemberLoading,
    data: groupMemberData,
    error: groupMemberError,
  } = useQuery(QUERY_GROUP_MEMBER, {
    variables: { groupId: group._id }, // Assuming group._id is available
    skip: !group._id, // Skip the query if group._id is not available
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

  const handleUserSelect = (castMemberId, userId) => {
    setSelectedUsers({ ...selectedUsers, [castMemberId]: userId });
  };

  const addCastMemberHandler = async (castMember) => {
    try {
      const { data } = await addCastMemberToUserRoster({
        variables: {
          userId: Auth.getProfile().authenticatedPerson._id,
          castMember: castMember.name, // Assuming castMember.name is the correct value to be passed
        },
      });
      // Update the roster with the added cast member
      setRoster([...roster, castMember.name]);
    } catch (error) {
      console.error("Error adding cast member to user roster:", error);
    }
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
                <h1 className="card-title mt-3">{game.name}</h1>
                <div className="col m-auto p-1 mb-5">
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
                    </div>
                  </div>
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
                <div className="card-text mb-5">
                  <div className="row">
                    <div className="col-md-6 mb-1">
                      <div className="field-title m-0">Description:</div>{" "}
                      {game.description}
                    </div>

                    {/* CAST MEMBERS */}
                    {game.castMembers ? (
                      <div className="row">
                        <div className="field-title m-0">Cast Members:</div>{" "}
                        {game.castMembers.map((castMember) => (
                          <div className="col-md-6 mb-1" key={castMember._id}>
                            {castMember.name}
                            <i
                              className="fas fa-plus-circle"
                              style={{ marginLeft: "5px", cursor: "pointer" }}
                              onClick={() => addCastMemberHandler(castMember)} // Pass the castMember object
                            ></i>

                            {/* Optionally, display the selected user */}
                            {selectedUsers[castMember._id] && (
                              <span style={{ marginLeft: "5px" }}>
                                Selected user: {selectedUsers[castMember._id]}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : null}

                    <div className="col-md-6 mt-5 mb-2">
                      <div className="field-title m-0  d-flex text-start">
                        Number of Cast Members:{" "}
                      </div>
                      <div className="textwrap d-flex text-start">
                        {game.numMembers}
                      </div>
                    </div>
                  </div>
                </div>

                {/* PLAYERS */}
                <div className="d-flex justify-content-center flex-column align-items-center">
                  <h3 className="mb-3">Players</h3>
                  <div className="row row-cols-auto">
                    {groupMemberData &&
                      groupMemberData.groupMembers.map((user) => (
                        <div className="col" key={user._id}>
                          <div className="badge author-badge p-auto m-2">
                            <i className="fas fa-user fa-lg m-2"></i>
                            <div className="d-flex flex-column">
                              <h6>{user.username}</h6>
                              {/* Optionally, display additional user information */}
                              <p>
                                {user.firstName} {user.lastName}
                              </p>
                              {/* ROSTERS?? */}
                              <div>Roster:</div>
                              <ul>
                                {roster.map((castMember, index) => (
                                  <li key={index}>{castMember}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
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

/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";

import {
  QUERY_GAME,
  QUERY_USER,
  QUERY_GROUP_MEMBER,
  GET_DRAFTED_CAST_MEMBERS,
} from "../utils/queries";
import {
  JOIN_GAME,
  LEAVE_GAME,
  DRAFT_CAST_MEMBER,
  UNDRAFT_CAST_MEMBER,
} from "../utils/mutations";
import "./style.css";
import Auth from "../utils/auth";

function Game() {
  const { id: gameId } = useParams();
  const navigate = useNavigate();
  const loggedIn = Auth.loggedIn();

  const [game, setGame] = useState({});
  const [group, setGroup] = useState({});
  const [selectedUsers, setSelectedUsers] = useState({});
  const [joined, setJoined] = useState(false);
  const [draftedCastMemberIds, setDraftedCastMemberIds] = useState([]);

  const [joinGame] = useMutation(JOIN_GAME);
  const [leaveGame] = useMutation(LEAVE_GAME);

  const { loading, data, error } = useQuery(QUERY_GAME, {
    variables: { id: gameId },
  });
  const { loading: draftedLoading, data: draftedData } = useQuery(
    GET_DRAFTED_CAST_MEMBERS
  );

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

  // ROSTER DRAFTING
  useEffect(() => {
    if (
      draftedData &&
      draftedData.user &&
      draftedData.user.draftedCastMembers
    ) {
      const draftedCastMembers = draftedData.user.draftedCastMembers;
      // Extract IDs of drafted cast members
      const draftedIds = draftedCastMembers.map((castMember) => castMember._id);
      setDraftedCastMemberIds(draftedIds);

      const updatedGroupMembers = groupMemberData.groupMembers.map((user) => {
        const updatedRoster = user.roster.filter(
          (castMember) => !draftedIds.includes(castMember._id)
        );
        return { ...user, roster: updatedRoster };
      });
      setGroup(updatedGroupMembers);
    }
  }, [draftedData, groupMemberData]);

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

  const [draftCastMember] = useMutation(DRAFT_CAST_MEMBER);
  const DraftCastMemberButton = ({ castMemberId }) => {
    const handleDraft = () => {
      draftCastMember({
        variables: { castMemberId },
        // You can include more options here, like refetchQueries, onError, etc.
      });
    };

    return <button onClick={handleDraft}>Draft</button>;
  };

  const [undraftCastMember] = useMutation(UNDRAFT_CAST_MEMBER);
  const UndraftCastMemberButton = ({ castMemberId }) => {
    const handleUndraft = () => {
      undraftCastMember({
        variables: { castMemberId },
        // You can include more options here, like refetchQueries, onError, etc.
      });
    };

    return <button onClick={handleUndraft}>Undraft</button>;
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
                {/* GAME DETAILS */}
                <div className="card-text mb-5">
                  <div className="row">
                    {/* Description */}
                    <div className="col-md-6 mb-1">
                      <div className="field-title m-0">Description:</div>{" "}
                      {game.description}
                    </div>
                    {/* Number of Cast Members */}
                    <div className="col-md-6 mb-2">
                      <div className="field-title m-0 d-flex text-start">
                        Number of Cast Members:{" "}
                      </div>
                      <div className="textwrap d-flex text-start">
                        {game.numMembers}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  {/* Cast Members */}
                  <div className="col-md-6 mb-1">
                    {game.castMembers ? (
                      <div>
                        <h3 className="field-title m-0">Cast Members:</h3>{" "}
                        {game.castMembers.map((castMember) => (
                          <div key={castMember._id}>
                            {castMember.name}
                            <i
                              className="fas fa-plus-circle"
                              style={{ marginLeft: "5px", cursor: "pointer" }}
                              onClick={() =>
                                draftCastMember({
                                  variables: { castMemberId: castMember._id },
                                })
                              }
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
                  </div>
                  {/* Cast Members End */}

                  {/* User Rosters */}
                  <div className="col-md-6">
                    <div className="d-flex justify-content-center flex-column align-items-center">
                      <h3 className="field-title m-0">Players</h3>
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
                                  {/* Rosters */}
                                  <div>Roster:</div>
                                  <ul>
                                    {user.roster &&
                                      user.roster
                                        .filter((castMember) => {
                                          // Check if the cast member is not drafted
                                          return !draftedCastMemberIds.includes(
                                            castMember._id
                                          );
                                        })
                                        .map((castMember, index) => (
                                          <li key={index}>{castMember.name}</li>
                                        ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                  {/* User Rosters End */}
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

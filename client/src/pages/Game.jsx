/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";

// IMPORT QUERIES & MUTATIONS
import {
  QUERY_GAME,
  QUERY_USER,
  QUERY_GROUP_MEMBER,
  GET_DRAFTED_CAST_MEMBERS,
} from "../utils/queries";
import {
  JOIN_GAME,
  LEAVE_GAME,
  DRAFT_CAST_MEMBER_FOR_GAME,
  UNDRAFT_CAST_MEMBER_FOR_GAME,
} from "../utils/mutations";

import "./style.css";
import Auth from "../utils/auth";

function Game() {
  const { id: gameId } = useParams();
  const navigate = useNavigate();
  const loggedIn = Auth.loggedIn();

  // STATE
  const [game, setGame] = useState({});
  const [group, setGroup] = useState({});
  const [joined, setJoined] = useState(false);
  const [draftedCastMemberIds, setDraftedCastMemberIds] = useState([]);

  // MUTATIONS
  const [joinGame] = useMutation(JOIN_GAME);
  const [leaveGame] = useMutation(LEAVE_GAME);

  const [draftCastMember] = useMutation(DRAFT_CAST_MEMBER_FOR_GAME);
  const [undraftCastMember] = useMutation(UNDRAFT_CAST_MEMBER_FOR_GAME);

  // QUERIES
  const [getUser, { loading: userLoading, data: userData, error: userError }] =
    useLazyQuery(QUERY_USER);

  if (userData && userData.user) {
    const { _id, firstName, lastName, username } = userData.user;
    console.log(`User ID: ${_id}`);
    console.log(`First Name: ${firstName}`);
    console.log(`Last Name: ${lastName}`);
    console.log(`Username: ${username}`);
  }

  const { loading, data, error } = useQuery(QUERY_GAME, {
    variables: { id: gameId },
  });

  const { loading: draftedLoading, data: draftedData } = useQuery(
    GET_DRAFTED_CAST_MEMBERS,
    {
      variables: { userId: Auth.getProfile().id, gameId: gameId },
    }
  );

  const {
    loading: groupMemberLoading,
    data: groupMemberData,
    error: groupMemberError,
  } = useQuery(QUERY_GROUP_MEMBER, {
    variables: { groupId: group._id },
    skip: !group._id,
  });

  // GAME & GROUP DATA
  useEffect(() => {
    if (data) {
      setGame(data.game);
      if (data.game.groups && data.game.groups.name) {
        setGroup(data.game.groups);
      }
    }
  }, [data]);

  // ROSTER DRAFTING & GROUP MEMBER DATA
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

      // Get the username from the authenticated user's profile
      const username = Auth.getProfile().authenticatedPerson.username;

      // Call the QUERY_GROUP_MEMBER with the username variable
      getUser({
        variables: { groupId: group._id, username }, // Pass groupId and username variables
      });

      const updatedGroupMembers = groupMemberData.groupMembers.map((user) => {
        const updatedRoster = user.roster.filter(
          (castMember) => !draftedIds.includes(castMember._id)
        );
        return { ...user, roster: updatedRoster };
      });
      setGroup(updatedGroupMembers);
    }
  }, [draftedData, groupMemberData, getUser, group._id]);

  // AUTHENTICATED USER DATA
  useEffect(() => {
    if (loggedIn && group._id) {
      // Ensure loggedIn and group ID exist
      const username = Auth.getProfile().authenticatedPerson.username;
      getUser({
        variables: { groupId: group._id, username }, // Pass groupId variable
      });
    }
  }, [loggedIn, group._id, getUser]);

  // CHECK IF USER HAS JOINED GAME
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

  const handleReturnToGames = () => {
    // Use the navigate function to navigate back
    navigate(-1); // This is equivalent to navigating back one step
  };

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

  const handleDraft = (castMemberId) => {
    draftCastMember({
      variables: { castMemberId },
    });
  };

  const handleUndraft = (castMemberId) => {
    undraftCastMember({
      variables: { castMemberId },
    });
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
                    {/* Display join/leave button based on authentication */}
                    {loggedIn !== false && (
                      <div
                        className="badge badge-light p-auto"
                        onClick={joined !== false ? leaveHandler : joinHandler}
                      >
                        <i
                          className="fa-solid fa-thumbtack fa-2x p-auto"
                          style={{
                            color: joined !== false ? "#da6d44" : "#e4b54b",
                          }}
                        ></i>
                      </div>
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
                    {game.castMembers && (
                      <div>
                        <h3 className="field-title m-0">Cast Members:</h3>{" "}
                        {game.castMembers.map((castMember) => (
                          <div key={castMember._id}>
                            {castMember.name}
                            <i
                              className="fas fa-plus-circle plusbutton"
                              style={{ marginLeft: "5px", cursor: "pointer" }}
                              onClick={() =>
                                draftCastMember({
                                  variables: { castMemberId: castMember._id },
                                })
                              }
                            ></i>
                          </div>
                        ))}
                      </div>
                    )}
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
                                  <p>
                                    {user.firstName} {user.lastName}
                                  </p>
                                  {/* Rosters */}
                                  <div>Roster:</div>
                                  <ul>
                                    {user.roster &&
                                      user.roster
                                        .filter(
                                          (castMember) =>
                                            !draftedCastMemberIds.includes(
                                              castMember._id
                                            )
                                        )
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
            {/* Return to Games button */}
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
      {/* Display loading message */}
      {loading && <div>Loading...</div>}
    </>
  );
}

export default Game;

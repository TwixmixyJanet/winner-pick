import { useState, useEffect } from "react";
import { initMDB, Ripple } from "mdb-ui-kit";
import { useQuery } from "@apollo/client";
import {
  QUERY_GROUP_GAME,
  QUERY_GROUP,
  QUERY_GROUP_MEMBER,
} from "../utils/queries";
import { useParams, Link } from "react-router-dom";
import "./style.css";

initMDB({ Ripple });

function GroupGames() {
  const { groupId } = useParams();
  const { loading, error, data } = useQuery(QUERY_GROUP_GAME, {
    variables: { groupId: groupId },
  });
  const groupData = useQuery(QUERY_GROUP, {
    variables: { id: groupId },
  });
  const groupMemberData = useQuery(QUERY_GROUP_MEMBER, {
    variables: { groupId: groupId },
  });

  const [games, setGames] = useState([]);
  const [groupdata, setGroupData] = useState("");
  const [groupmembers, setGroupMemeberData] = useState("");

  useEffect(() => {
    if (!loading && data && data.groupGame) {
      setGames(data.groupGame);
    } else if (!loading && error) {
      console.error("Error fetching data:", error);
    }
  }, [data, loading, error]);

  useEffect(() => {
    if (groupData && groupData.data && groupData.data.group) {
      setGroupData(groupData.data.group);
    } else if (!groupData.loading && groupData.error) {
      console.error("Error fetching data:", groupData.error);
    }
  }, [groupData, groupData.data, groupData.loading, groupData.error]);

  useEffect(() => {
    if (
      groupMemberData &&
      groupMemberData.data &&
      groupMemberData.data.groupMembers
    ) {
      setGroupMemeberData(groupMemberData.data.groupMembers);
    } else if (!groupMemberData.loading && groupMemberData.error) {
      console.error("Error fetching data:", groupMemberData.error);
    }
  }, [groupMemberData]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <h2 className="text-center mt-3 mb-0">{groupdata?.name || ""} Games</h2>
      <p className="text-center">
        <small>
          (<b>Group ID:</b> {groupdata?._id || ""})
        </small>
      </p>
      <h4 className="text-center">Members in this group</h4>
      <section className="d-flex justify-content-center text-center">
        {groupmembers.length !== 0 ? (
          <ul className="list-group lst-group-light">
            {groupmembers.map((member) => (
              <li
                className="list-group-item d-flex justify-content-between align-items-start"
                key={member._id}
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{member.username}</div>
                  {member.lastName} {member.firstName}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div></div>
        )}
      </section>
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
          <div className="text-center">
            There is no game added to this group yet!
          </div>
        )}
      </section>
    </>
  );
}

export default GroupGames;

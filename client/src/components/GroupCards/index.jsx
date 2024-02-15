/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { initMDB, Ripple, Modal } from "mdb-ui-kit";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { QUERY_GROUP_GAME_PHOTOS, QUERY_GROUP } from "../../utils/queries";
import { ADD_GROUP, JOIN_GROUP, LEAVE_GROUP } from "../../utils/mutations";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

const GroupCard = () => {
  useEffect(() => {
    initMDB({ Ripple, Modal });
  });

  const [groups, setGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState("");
  const [searchGroupId, setSearchGroupId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [createNewGroup] = useMutation(ADD_GROUP);
  const [findGroup] = useLazyQuery(QUERY_GROUP);
  const [joinGroup] = useMutation(JOIN_GROUP);
  const [leaveGroup] = useMutation(LEAVE_GROUP);
  const [searchResult, setSearchResult] = useState("");

  const { loading, error, data } = useQuery(QUERY_GROUP_GAME_PHOTOS, {
    variables: { username: Auth.getProfile().authenticatedPerson.username },
  });

  useEffect(() => {
    if (data) {
      setGroups(data.groupGamePhotos);
    }
  }, [data, loading, error]);

  if (loading) return <p>Loading...</p>;

  if (error) {
    console.error("Error fetching data:", error);
    return <p>Error: Unable to fetch data</p>;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "group_name") {
      setNewGroupName(value);
    } else if (name === "search-group-by-id") {
      setSearchGroupId(value);
      setErrorMessage("");
    }

    if (value.trim() !== "") {
      event.target.classList.add("active");
    } else {
      event.target.classList.remove("active");
    }
  };

  const submitNewGroup = async (event) => {
    event.preventDefault();
    try {
      const { data } = await createNewGroup({
        variables: { name: newGroupName },
      });
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const searchGroup = async (event) => {
    event.preventDefault();
    try {
      if (groups) {
        console.log(groups);
        if (groups.find((group) => group.groupId === searchGroupId)) {
          setErrorMessage("You're already a member of this group");
          return;
        }
      }
      const { data, error } = await findGroup({
        variables: { id: searchGroupId },
      });

      if (data) {
        if (!data.group) {
          setErrorMessage("Couldn't find any group with this ID");
        } else {
          setSearchResult(data.group);
        }
      }
      if (error) {
        setErrorMessage(
          "Something went wrong - please double check if you added the correct ID"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleJoinGroup = async (event) => {
    event.preventDefault();
    try {
      const { data } = await joinGroup({
        variables: { groupId: searchResult._id },
      });
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLeaveGroup = async (event) => {
    event.preventDefault();
    try {
      const { data } = await leaveGroup({
        variables: { groupId: event.target.id },
      });
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const tabChangeHandler = async (e) => {
    if (e.target.id == "mdb-tab-search-group") {
      document.getElementById("mdb-tab-search-group").classList.add("active");
      document
        .getElementById("pills-search-group")
        .classList.add("active", "show");
      document
        .getElementById("mdb-tab-create-group")
        .classList.remove("active");
      document
        .getElementById("pills-create-group")
        .classList.remove("active", "show");
      setNewGroupName("");
    } else if (e.target.id == "mdb-tab-create-group") {
      document.getElementById("mdb-tab-create-group").classList.add("active");
      document
        .getElementById("pills-create-group")
        .classList.add("active", "show");
      document
        .getElementById("mdb-tab-search-group")
        .classList.remove("active");
      document
        .getElementById("pills-search-group")
        .classList.remove("active", "show");
      setSearchGroupId("");
    }
  };

  return (
    <>
      <section className="container m-auto justify-content-between d-flex flex-wrap">
        <h2>Your Group</h2>
        <div>
          <button
            type="button"
            className="btn"
            data-mdb-ripple-init
            data-mdb-modal-init
            data-mdb-target="#open-group-modal"
          >
            Join or create group
          </button>
        </div>
      </section>
      <section className="d-flex p-2 m-auto flex-wrap">
        {groups.length !== 0 ? (
          <div className="d-flex p-1 justify-content-between" id="famFlex">
            {groups.map((group) => (
              <div className="card mb-4" key={group.groupId} id="group-card">
                {group.photos.length !== 0 ? (
                  <div
                    className="bg-image hover-overlay"
                    data-mdb-ripple-init
                    data-mdb-ripple-color="light"
                  >
                    {group.photos.length !== 1 ? (
                      <img
                        src={
                          group?.photos[
                            Math.floor(Math.random() * group.photos.length)
                          ] || ""
                        }
                        className="img-fluid"
                        alt={group?.name || ""}
                      />
                    ) : (
                      <img
                        src={group?.photos[0] || ""}
                        className="img-fluid"
                        alt={group?.name || ""}
                      />
                    )}
                    <div
                      className="mask"
                      style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                    ></div>
                  </div>
                ) : (
                  <div></div>
                )}
                <div className="card-body">
                  <h4 className="card-title mb-2">
                    {group?.name || "No Title"}
                  </h4>
                  <p className="mb-2 p-auto">
                    <b>ID: </b>
                    {"\n \n"}
                    {group?.groupId || ""}
                  </p>
                  <div>
                    <Link
                      to={`/groupgames/${group.groupId}`}
                      className="btn btn-block m-auto mb-2"
                      data-mdb-ripple-init
                    >
                      Play Games
                    </Link>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-block m-auto"
                    data-mdb-ripple-init=""
                    onClick={handleLeaveGroup}
                    id={group.groupId}
                  >
                    Leave this group
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>You are not a member of any group yet</p>
        )}
      </section>

      {/* Modal */}
      <div
        className="modal fade"
        tabIndex="-1"
        id="open-group-modal"
        aria-modal="true"
        role="dialog"
        data-mdb-modal-initialized
        display="block"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-body p-3">
              <ul
                className="nav nav-pills nav-justified mb-3"
                id="ex1"
                role="tablist"
              >
                <li
                  className="nav-item"
                  role="presentation"
                  onClick={tabChangeHandler}
                >
                  <a
                    className="nav-link active"
                    data-mdb-pill-init=""
                    href="#pills-create-group"
                    role="tab"
                    aria-controls="pills-create-group"
                    aria-selected="true"
                    data-mdb-tab-initialized="true"
                    id="mdb-tab-create-group"
                  >
                    Create group
                  </a>
                </li>
                <li
                  className="nav-item"
                  role="presentation"
                  onClick={tabChangeHandler}
                >
                  <a
                    className="nav-link"
                    data-mdb-pill-init=""
                    href="#pills-search-group"
                    role="tab"
                    aria-controls="pills-search-group"
                    aria-selected="false"
                    data-mdb-tab-initialized="true"
                    tabIndex="-1"
                    id="mdb-tab-search-group"
                  >
                    Search group
                  </a>
                </li>
              </ul>
              <div className="tab-content">
                <div
                  className="tab-pane fade active show"
                  id="pills-create-group"
                  role="tabpanel"
                  aria-labelledby="mdb-tab-create-group"
                >
                  <form>
                    <div className="form-outline mb-4">
                      <input
                        type="group_name"
                        id="group_name"
                        name="group_name"
                        className="form-control"
                        value={newGroupName}
                        onChange={handleChange}
                      />
                      <label className="form-label" htmlFor="group_name">
                        Name of the new group group
                      </label>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-block m-auto"
                      data-mdb-ripple-init=""
                      onClick={submitNewGroup}
                    >
                      Submit
                    </button>
                  </form>
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-search-group"
                  role="tabpanel"
                  aria-labelledby="mdb-search-group"
                >
                  <form>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="search-group-by-id"
                        name="search-group-by-id"
                        className="form-control"
                        value={searchGroupId}
                        onChange={handleChange}
                      />
                      <label
                        className="form-label"
                        htmlFor="search-group-by-id"
                      >
                        Group ID
                      </label>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-block m-auto mb-3"
                      data-mdb-ripple-init=""
                      onClick={searchGroup}
                    >
                      Search
                    </button>
                    <div>
                      {searchResult !== "" ? (
                        <div>
                          <div>
                            <h5>Search result</h5>
                            <div className="text-center">
                              ID: {searchResult._id} <br />
                              Name of the group: {searchResult.name}
                            </div>
                          </div>
                          <button
                            type="submit"
                            className="btn btn-block m-auto"
                            data-mdb-ripple-init=""
                            onClick={handleJoinGroup}
                          >
                            Join this group
                          </button>
                        </div>
                      ) : (
                        ""
                      )}
                      {errorMessage !== "" ? (
                        <div style={{ color: "red" }}>{errorMessage}</div>
                      ) : (
                        ""
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupCard;

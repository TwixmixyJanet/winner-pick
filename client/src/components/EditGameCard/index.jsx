import { Input, Ripple, initMDB } from "mdb-ui-kit";
import { useQuery, useMutation } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Auth from "../../utils/auth";

import { QUERY_USER, QUERY_GAME } from "../../utils/queries";
import { UPDATE_GAME } from "../../utils/mutations";

initMDB({ Input, Ripple });

export default function GameForm() {
  const { id: gameId } = useParams();
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [myImage, setMyImage] = useState();
  const [userFamlies, setUserGroups] = useState([]);
  const [uploadError, setuploadError] = useState("");

  const { loading, data, error } = useQuery(QUERY_GAME, {
    variables: { id: gameId },
  });

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "defuryakl",
        uploadPreset: "winnerpick",
      },
      function (error, result) {
        if (result && result.info && result.info.secure_url) {
          setMyImage(result.info.secure_url);
        }
      }
    );
  }, []);

  const [updateGame] = useMutation(UPDATE_GAME);

  // const username = "B-King";
  const username = Auth.getProfile().authenticatedPerson.username;
  // Update the variables below to be authorized user's username when we get there.
  const { data: userData } = useQuery(QUERY_USER, {
    variables: { username: username },
  });

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    castMembers: "",
    numMembers: "",
    groupId: "", // The selected group id
  });

  const handleSubmit = async () => {
    try {
      console.log("formData: ", formData);
      console.log("myImage: ", myImage);
      console.log("username: ", username);
      const { name, description, castMembers, numMembers, groupId } = formData;

      // Use updateGame mutation instead of addGame
      const { data, error } = await updateGame({
        variables: {
          // Include game ID in the variables
          id: gameId,
          name: name,
          description: description,
          castMembers: castMembers,
          numMembers: numMembers,
          groupId: groupId,
          photo: myImage,
          author: username,
        },
        // refetchQueries: [{ query: QUERY_GAME, variables: { username } }],
      });
      console.log("data: ", data);

      if (data) {
        window.location.replace(window.location.origin + "/dashboard");
      }

      if (error) {
        setuploadError("something went wrong, please try again");
      }
    } catch (error) {
      console.error("Error submitting game:", error);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    const inputElement = e.target;
    if (value.trim() !== "") {
      inputElement.classList.add("active");
    } else {
      inputElement.classList.remove("active");
    }
    console.log(formData);
  };

  const handleGroupChange = (e) => {
    setFormData({ ...formData, groupId: e.target.value });
  };

  useEffect(() => {
    if (userData) {
      setUserGroups(userData.user.groups);
    }
  }, [userData]);

  useEffect(() => {
    if (data && data.game) {
      // Set initial state using data
      setFormData({
        name: data.game.name || "",
        description: data.game.description || "",
        castMembers: data.game.castMembers || "",
        numMembers: data.game.numMembers || "",
        groupId: data.game.groups._id || "",
      });

      setMyImage(data.game.photo || ""); // Set image if available
    }

    document.querySelectorAll("input").forEach((input) => {
      input.classList.add("active");
    });

    document.querySelectorAll("textarea").forEach((textarea) => {
      textarea.classList.add("active");
    });
  }, [data]);

  const handleUpload = (event) => {
    event.preventDefault();
    // This is to prevent the page from reloading when someone clicks the button to upload a picture
  };

  useEffect(() => {
    // Initialize MDB UI Kit components after the component has loaded
    document.querySelectorAll("form-outline").forEach((formOutline) => {
      if (formOutline && formOutline.classList) {
        try {
          new Input(formOutline).update();
        } catch (error) {
          console.error("Error updating Input:", error);
        }
      }
    });
  }, []);

  return (
    <form className="mb-5 p-1">
      <div className="col m-auto">
        <div className="col-5">
          <div data-mdb-input-init className="form-outline mb-3">
            <input
              type="text"
              id="name"
              className="form-control"
              value={formData.name}
              onChange={handleInputChange}
            />
            <label className="form-label" htmlFor="name">
              Game Name
            </label>
          </div>
        </div>

        <div className="col-5 p-0">
          <div data-mdb-input-init className="form-outline mb-3">
            <input
              type="number"
              id="description"
              placeholder="0"
              className="form-control"
              value={formData.description}
              onChange={handleInputChange}
            />
            <label className="form-label" htmlFor="description">
              Whats this show about?
            </label>
          </div>
        </div>

        <div className="col-5 p-0">
          <div data-mdb-input-init className="form-outline mb-3">
            <input
              type="number"
              id="castMembers"
              className="form-control"
              placeholder="0"
              value={formData.castMembers}
              onChange={handleInputChange}
            />
            <label className="form-label" htmlFor="castMembers">
              Name of cast members
            </label>
          </div>
        </div>

        <div data-mdb-input-init className="form-outline mb-3">
          <textarea
            className="form-control"
            id="numMembers"
            rows="4"
            value={formData.numMembers}
            onChange={handleInputChange}
          ></textarea>
          <label className="form-label" htmlFor="numMembers">
            Insert # variable
          </label>
        </div>

        <div data-mdb-input-init className="form-outline m-auto row">
          <label className="visually-hidden">Group</label>
          <select
            data-mdb-select-init
            className="select"
            id="groupId"
            placeholder="Select a group to share this game"
            value={formData.groupId}
            onChange={handleGroupChange}
          >
            {loading ? (
              <option defaultValue="" disabled className="optColor">
                Join or create group to upload a new game
              </option>
            ) : (
              <>
                <option defaultValue="" selected className="optColor">
                  Choose a group (Select a group to share this game)
                </option>
                {userFamlies.map((group) => (
                  <option
                    key={group._id}
                    value={group._id}
                    className="optColor"
                  >
                    {group.name}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>

        <div
          data-mdb-input-init
          className="form-outline mt-4 m-auto row"
          onClick={handleUpload}
        >
          <section>
            <div>
              <img
                className="uploaded-image-cloudinary"
                src={myImage}
                id="cloudBox"
              />
            </div>
            <div className="m-auto">
              <button className="" onClick={() => widgetRef.current.open()}>
                Upload Image
              </button>
            </div>
          </section>
          <sub className="text-muted m-auto mt-2">
            Upload a picture of your game
          </sub>
        </div>

        <button
          data-mdb-ripple-init
          type="button"
          className="btn btn-block btn-lg m-auto mt-4 submit"
          onClick={handleSubmit}
        >
          Update Game
        </button>
      </div>
      <h4 className="text-center" style={{ color: "red" }}>
        {uploadError}
      </h4>
    </form>
  );
}

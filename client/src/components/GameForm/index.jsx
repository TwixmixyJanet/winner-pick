import { Input, Ripple, initMDB } from "mdb-ui-kit";
import { useQuery, useMutation } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import Auth from "../../utils/auth";

import { QUERY_USER, QUERY_ALL_CAST_MEMBERS } from "../../utils/queries";
import { ADD_GAME, ADD_CAST_MEMBER } from "../../utils/mutations";

import "../../pages/style.css";

initMDB({ Input, Ripple });

export default function GameForm() {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [myImage, setMyImage] = useState();
  const [userGroups, setUserGroups] = useState([]);
  const [uploadError, setuploadError] = useState("");

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

  const [addGame] = useMutation(ADD_GAME);

  // const username = "B-King";
  const username = Auth.getProfile().authenticatedPerson.username;
  // Update the variables below to be authorized user's username when we get there.
  const { loading, data } = useQuery(QUERY_USER, {
    variables: { username: username },
  });

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    castMembers: [],
    numMembers: "",
    groupId: "",
  });

  const handleSubmit = async () => {
    try {
      const { name, description, castMembers, numMembers, groupId } = formData;
      console.log(castMembers);

      const gameResult = await addGame({
        variables: {
          name: name,
          description: description,
          numMembers: parseInt(numMembers),
          groupId: groupId,
          photo: myImage,
          author: username,
          castMembers: castMembers,
        },
        refetchQueries: [{ query: QUERY_USER, variables: { username } }],
      });

      console.log(gameResult);

      // Reset form state
      setFormData({
        name: "",
        description: "",
        numMembers: "",
        groupId: "",
      });

      setMyImage("");

      // Redirect or handle success as needed
      window.location.replace(window.location.origin + "/dashboard");
    } catch (error) {
      console.error("Error submitting game:", error);
      setuploadError("Something went wrong, please try again");
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
    if (data) {
      setUserGroups(data.user.groups);
    }
  }, [data, loading]);

  useEffect(() => {
    // Initialize MDB UI Kit components after the component has loaded
    document.querySelectorAll(".form-outline").forEach((formOutline) => {
      if (formOutline && formOutline.classList) {
        try {
          new Input(formOutline).update();
        } catch (error) {
          console.error("Error updating Input:", error);
        }
      }
    });
  }, []);

  const handleUpload = (event) => {
    event.preventDefault();
    // This is to prevent the page from reloading when someone clicks the button to upload a picture
  };

  const [name, setName] = useState("");
  const [castMembers, setCastMembers] = useState([]);
  // Define the ADD_CAST_MEMBER mutation
  const [addCastMember] = useMutation(ADD_CAST_MEMBER);

  const handleAddCastMember = async () => {
    try {
      if (!name.trim()) return;

      // Call the ADD_CAST_MEMBER mutation
      const { data } = await addCastMember({
        variables: { name: name },
      });

      // Update the castMembers state with the newly added cast member
      if (data && data.addCastMember) {
        setCastMembers((prevCastMembers) => [
          ...prevCastMembers,
          data.addCastMember.name,
        ]);
        setFormData({
          ...formData,
          castMembers: [...formData.castMembers, data.addCastMember._id],
        });
        console.log(formData.castMembers);
      }

      // Clear the input field after adding cast member
      setName("");
    } catch (error) {
      console.error("Error adding cast member:", error);
      // Handle error as needed
    }
  };

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
        <div data-mdb-input-init className="form-outline mb-3">
          <input
            type="text"
            id="description"
            placeholder="Description of the game..."
            className="form-control"
            value={formData.description}
            onChange={handleInputChange}
          />
          <label className="form-label" htmlFor="description">
            Game Description
          </label>
        </div>
        <div className="col-5 p-0">
          <div data-mdb-input-init className="form-outline mb-3">
            <input
              type="number"
              id="numMembers"
              className="form-control"
              placeholder="Number of cast members"
              value={formData.numMembers}
              onChange={handleInputChange}
            />
            <label className="form-label" htmlFor="numMembers">
              How many cast members are on this show?
            </label>
          </div>
        </div>

        <div className="col-5 p-0">
          <div data-mdb-input-init className="form-outline mb-3">
            <div>
              <input
                type="text"
                placeholder="Enter cast member name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button type="button" onClick={handleAddCastMember}>
                Add Cast Member
              </button>
            </div>
            <ul>
              {castMembers.map((castMember, index) => (
                <li key={index}>{castMember}</li>
              ))}
            </ul>
          </div>
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
                <option defaultValue="" className="optColor">
                  Choose a group (Select a group to share this game)
                </option>
                {userGroups.map((group) => (
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
          Submit Game
        </button>
      </div>
      <h4 className="text-center" style={{ color: "red" }}>
        {uploadError}
      </h4>
    </form>
  );
}

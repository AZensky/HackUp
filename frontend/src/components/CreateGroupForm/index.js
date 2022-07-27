import React, { useState, useEffect } from "react";
import "./CreateGroupForm.css";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createGroup } from "../../store/groups";

function CreateGroupForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [type, setType] = useState("Online");
  const [isPrivate, setIsPrivate] = useState(false);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const errors = [];
    if (name.length > 60) errors.push("Name must be 60 characters or less");
    if (about.length < 50) errors.push("About must be 50 characters or more");

    setValidationErrors(errors);
  }, [name, about]);

  async function handleSubmit(e) {
    e.preventDefault();
    setHasSubmitted(true);

    if (validationErrors.length > 0) {
      return;
    }

    const info = {
      name,
      about,
      type,
      private: isPrivate,
      city,
      state,
    };

    let createdGroup = await dispatch(createGroup(info));

    history.push(`/groups/${createdGroup.id}`);
  }

  return (
    <div className="create-group-form-page-container">
      <div className="create-group-form-container">
        <form onSubmit={handleSubmit} className="create-group-form">
          <ul>
            {hasSubmitted &&
              validationErrors.length > 0 &&
              validationErrors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <h1 className="create-group-form__title">Create a Group</h1>
          <label>
            Group Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            About
            <input
              type="text"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              required
            />
          </label>
          <label className="create-group-form__email__label">
            Type
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="Online">Online</option>
              <option value="In person">In Person</option>
            </select>
          </label>

          <label
            className="private-option"
            onChange={(e) => setIsPrivate(e.target.value)}
          >
            Private?
            <select
              value={isPrivate}
              onChange={(e) => setIsPrivate(e.target.value)}
            >
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>
          </label>
          <label>
            City
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </label>
          <label>
            State
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </label>
          <button type="submit">Create Group</button>
        </form>
      </div>
    </div>
  );
}

export default CreateGroupForm;

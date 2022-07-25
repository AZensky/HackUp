import React, { useState } from "react";
import "./CreateGroupForm.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createGroup } from "../../store/groups";

function CreateGroupForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [type, setType] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [errors, setErrors] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    const info = {
      name,
      about,
      type,
      private: isPrivate,
      city,
      state,
    };

    let createdGroup = await dispatch(createGroup(info));
    if (createdGroup) {
      history.push(`/groups/${createdGroup.id}`);
    }
  }

  return (
    <div className="create-group-form-page-container">
      <div className="create-group-form-container">
        <form onSubmit={handleSubmit} className="create-group-form">
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
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
            <select value={isPrivate}>
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

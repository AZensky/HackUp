import React, { useState, useEffect } from "react";
import "./GroupDetailsHeader.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteGroup } from "../../store/groups";
import { useParams, useHistory, Link } from "react-router-dom";

function GroupDetailsHeader() {
  const { groupId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  const [groupDetails, setGroupDetails] = useState();

  useEffect(() => {
    const getGroupDetails = async () => {
      let response = await fetch(`/api/groups/${groupId}`);
      let data = await response.json();
      setGroupDetails(data);
    };

    getGroupDetails().catch(console.error);
  }, [groupId]);

  async function handleDelete() {
    await dispatch(deleteGroup(groupId));

    history.push("/groups");
  }

  return (
    <>
      <div className="group-details-header-container">
        <div className="group-details-header-content">
          <img
            src={
              groupDetails &&
              (groupDetails?.Images[0]?.url ||
                "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80")
            }
            alt="Group Pic"
          />
          <div className="group-header-info">
            <h1>{groupDetails && groupDetails.name}</h1>
            <div className="group-details-header-location-container">
              <i className="fa-solid fa-lg fa-location-pin"></i>
              <span className="group-details-location-span">
                {groupDetails && groupDetails.city},{" "}
                {groupDetails && groupDetails.state}
              </span>
            </div>
            <div className="group-details-headers-members-container">
              <i className="fa-solid fa-sm fa-people-group"></i>
              <span className="group-details-members-span">
                {groupDetails && groupDetails.numMembers}{" "}
                {groupDetails && groupDetails.numMembers === 1
                  ? "member"
                  : "members"}
              </span>
            </div>
            <div className="group-details-headers-organizer-container">
              <i className="fa-solid fa-xl fa-user"></i>
              <span className="group-details-organizer-span">
                Organized By {groupDetails && groupDetails.Organizer.firstName}{" "}
                {groupDetails && groupDetails.Organizer.lastName}
              </span>
            </div>
          </div>
        </div>

        {/* Only display edit and delete event if they are organizer of the group */}
        {sessionUser &&
          groupDetails &&
          sessionUser.id === groupDetails.organizerId && (
            <div className="group-edit-delete-menu-container">
              <i
                className="fa-solid fa-ellipsis"
                onClick={() => setShowMenu(!showMenu)}
              ></i>
              {showMenu && (
                <div className="group-edit-delete-menu">
                  <Link
                    to={`/groups/edit/${groupId}`}
                    className="edit-group-link"
                  >
                    Edit group
                  </Link>
                  <button onClick={handleDelete}>Delete group</button>
                </div>
              )}
            </div>
          )}
      </div>

      {/* Only display create event if they are organizer of the group */}
      {sessionUser &&
        groupDetails &&
        sessionUser.id === groupDetails.organizerId && (
          <div className="create-event-container">
            <Link to={`/groups/${groupId}/create-event`}>
              <button>Create an Event</button>
            </Link>
          </div>
        )}
    </>
  );
}

export default GroupDetailsHeader;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGroups } from "../../store/groups";
import NavChoice from "../EventGroupSharedComponents/NavChoice";
import GroupDetails from "./GroupDetails";
import "./GroupsPage.css";

function GroupsPage() {
  const dispatch = useDispatch();
  const groups = Object.values(useSelector((state) => state.groups));
  useEffect(() => {
    dispatch(getAllGroups());
  }, [dispatch]);

  return (
    <>
      <div className="groups-page-container">
        <NavChoice displaySort={false} isEvent={false} />
        {groups.map((group) => (
          <GroupDetails
            key={group.id}
            name={group.name}
            city={group.city}
            state={group.state}
            about={group.about}
            members={group.numMembers}
            preview={group.previewImage}
            id={group.id}
          />
        ))}
      </div>
    </>
  );
}

export default GroupsPage;

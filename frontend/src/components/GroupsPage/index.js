import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGroups } from "../../store/groups";

function GroupsPage() {
  const dispatch = useDispatch();
  const groups = Object.values(useSelector((state) => state.groups));
  useEffect(() => {
    dispatch(getAllGroups());
  }, [dispatch]);

  return (
    <div>
      {groups.map((group) => (
        <span key={group.id}>{group.name} | </span>
      ))}
    </div>
  );
}

export default GroupsPage;

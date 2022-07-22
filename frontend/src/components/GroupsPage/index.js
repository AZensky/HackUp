import Reac, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGroups } from "../../store/groups";

function GroupsPage() {
  const dispatch = useDispatch();
  const groups = Object.values(useSelector((state) => state.groups));
  console.log(groups);
  useEffect(() => {
    dispatch(getAllGroups());
  }, []);

  return (
    <div>
      {groups.map((group) => (
        <span>{group.name}</span>
      ))}
    </div>
  );
}

export default GroupsPage;

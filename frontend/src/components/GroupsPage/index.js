import Reac, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllGroups } from "../../store/groups";

function GroupsPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllGroups());
  }, [dispatch]);
  return <div>GroupsPage</div>;
}

export default GroupsPage;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { csrfFetch } from "../../store/csrf";
import "./ApproveMembers.css";

function ApproveMembers() {
  const { groupId } = useParams();
  const [groupMembers, setGroupMembers] = useState([]);

  useEffect(() => {
    const getGroupMembers = async () => {
      let response = await fetch(`/api/groups/${groupId}/members`);
      let data = await response.json();
      let pendingMembers = data.Members.filter(
        (member) => member.Membership.status === "pending"
      );
      setGroupMembers(pendingMembers);
    };

    getGroupMembers().catch(console.error);
  }, [groupId]);

  console.log("group", groupMembers);

  const handleApprove = async (memberId) => {
    const response = await csrfFetch(`/api/groups/${groupId}/members/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        memberId,
        status: "member",
      }),
    });

    const getGroupMembers = async () => {
      let response = await fetch(`/api/groups/${groupId}/members`);
      let data = await response.json();
      setGroupMembers(data.Members);
    };

    getGroupMembers().catch(console.error);
  };

  return (
    <div className="create-group-form-page-container">
      <div className="create-group-form-container">
        <div className="create-group-form">
          <div className="member-approval-header">
            <h1>Approve Members</h1>
          </div>
          <div className="member-approval-list">
            {groupMembers.map((member) => (
              <div className="member-approval-item">
                <div className="member-approval-item-name">
                  {member.firstName} {member.lastName}
                </div>
                <div className="member-approval-item-right">
                  <button
                    className="member-approval-item-approve"
                    onClick={() => handleApprove(member.id)}
                  >
                    Approve
                  </button>
                  <button className="member-approval-item-deny">Deny</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApproveMembers;

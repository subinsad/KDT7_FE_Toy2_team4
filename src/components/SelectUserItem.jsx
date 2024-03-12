import { useState } from "react";
import Avatar from "./Avatar";

const SelectUserItem = ({ userImg, name, team, uid, onChecked }) => {
  const [isActive, setIsActive] = useState(false);
  const handleUser = (e) => {
    onChecked(team, name, uid);
    setIsActive(!isActive);
  };

  return (
    <>
      <li>
        <button value="pending" onClick={handleUser} className={isActive ? "active" : ""}>
          <Avatar size={"sm"} src={userImg} role="strong" />
          <span className="name">
            [{team}] {name}
          </span>
        </button>
      </li>
    </>
  );
};

export default SelectUserItem;

import { useState } from "react";
import Avatar from "./Avatar";

const SelectUserItem = ({ img, name, team, onChecked }) => {
  const [isActive, setIsActive] = useState(false);
  const handleUser = (e) => {
    onChecked(e.target.textContent);
    setIsActive(!isActive);
  };

  return (
    <>
      <li>
        <button value="pending" onClick={handleUser} className={isActive ? "active" : ""}>
          <Avatar size={"sm"} src={img} role="strong" />
          <span className="name">
            [{team}] {name}
          </span>
        </button>
      </li>
    </>
  );
};

export default SelectUserItem;

import moment from "moment";
import { CardProps } from "../global.types";

const BASE_URL: string = import.meta.env.VITE_BASE_URL;
const CLIENT_URL: string = import.meta.env.VITE_CLIENT_URL;

const Card: React.FC<CardProps> = ({
  title,
  _id,
  content,
  updatedAt,
  setCurrTitle,
  setCurrContent,
  handleGetEntries,
}) => {
  const handleEntryClick = () => {
    setCurrTitle(title);
    setCurrContent(content);
  };

  const handleDeleteClick = async () => {
    await fetch(`${BASE_URL}/diaries/6642f5d10fe1de34eab81d12/${_id}`, {
      method: "DELETE",
      headers: {
        Origin: `${CLIENT_URL}`,
        "Access-Control-Request-Headers": "Content-Type",
        "Content-Type": "application/json",
        "Access-Control-Request-Method": "DELETE",
      },
    });
    handleGetEntries();
  };

  return (
    <div className="entry" onClick={handleEntryClick}>
      <p className="time">{moment(updatedAt).calendar()}</p>
      <p className="title-entry">
        {title}, <br />{" "}
        <span style={{ fontSize: "15px" }}>Dear Diary Today...</span>
        <button className="delete-button" onClick={handleDeleteClick}>
          Archive
        </button>
      </p>
    </div>
  );
};

export default Card;

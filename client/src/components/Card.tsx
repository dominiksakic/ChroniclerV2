import moment from "moment";
import { CardProps } from "../global.types";

const Card: React.FC<CardProps> = ({
  title,
  _id,
  content,
  updatedAt,
  setCurrTitle,
  setCurrContent,
}) => {
  const handleEntryClick = () => {
    setCurrTitle(title);
    setCurrContent(content);
  };

  return (
    <div className="entry" onClick={handleEntryClick}>
      <p className="time">{moment(updatedAt).calendar()}</p>
      <p className="title-entry">
        {title}, <br />{" "}
        <span style={{ fontSize: "15px" }}>Dear Diary Today...</span>
      </p>
    </div>
  );
};

export default Card;

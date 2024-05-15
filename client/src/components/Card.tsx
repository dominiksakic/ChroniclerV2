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
      <h3>{title}</h3>
      <p>{moment(updatedAt).fromNow()}</p>
    </div>
  );
};

export default Card;

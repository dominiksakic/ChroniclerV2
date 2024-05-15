import moment from "moment";
import { DiaryEntry } from "../global.types";

const Card: React.FC<DiaryEntry> = ({ title, _id, content, updatedAt }) => {
  return (
    <div className="entry">
      <h3>{title}</h3>
      <p>{moment(updatedAt).fromNow()}</p>
    </div>
  );
};

export default Card;

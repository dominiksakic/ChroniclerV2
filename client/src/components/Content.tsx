import { ContentProps } from "../global.types";

const Content: React.FC<ContentProps> = ({
  currTitle,
  currContent,
  setCurrContent,
  setCurrTitle,
}) => {
  return (
    <div className="write-space">
      <input
        type="text"
        maxLength={32}
        placeholder="New Entry"
        onChange={(e) => setCurrTitle(e.target.value)}
        value={currTitle}
      />
      <textarea
        maxLength={1000}
        placeholder="Please Write here"
        rows={10}
        cols={50}
        onChange={(e) => setCurrContent(e.target.value)}
        value={currContent}
      />
    </div>
  );
};

export default Content;

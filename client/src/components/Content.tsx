import { ContentProps } from "../global.types";

const Content: React.FC<ContentProps> = ({ currTitle, currContent }) => {
  return (
    <div className="write-space">
      <input
        type="text"
        maxLength={32}
        placeholder="New Entry"
        value={currTitle}
      />
      <textarea
        maxLength={1000}
        placeholder="Please Write here"
        rows={10}
        cols={50}
        value={currContent}
      />
    </div>
  );
};

export default Content;

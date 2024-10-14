import React from "react";

type Props = {
  tags: string[];
};

const TagList = ({ tags }: Props) => {
  return (
    <ul className="ml0 list-ls-none d-inline">
      {tags.map((tag, index) => (
        <li key={index} className="d-inline mr4">
          <div className="s-tag post-tag">{tag}</div>
        </li>
      ))}
    </ul>
  );
};

export default TagList;

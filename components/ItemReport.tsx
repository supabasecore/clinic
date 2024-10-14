import React from "react";

interface InfoItemProps {
  icon?: React.ReactNode;
  label: string;
}

interface ItemReportProps {
  items: InfoItemProps[];
}

export default function ItemReport({ items }: ItemReportProps) {
  return (
    <ul className="list-reset s-anchors s-anchors__inherit d-flex fc-light gs8 mln4 fw-wrap fs-headline1">
      {items.map((item, index) => (
        <li key={index} className="flex--item topic-tag topic-tag-link">
          <div className="d-flex gs4 gsx ai-center">
            {item.icon && <div className="flex--item">{item.icon}</div>}
            <span className="flex--item">
              <div className="gs4 gsx ai-center">{item.label}</div>
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

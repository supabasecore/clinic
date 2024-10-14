import Link from "next/link";
import React from "react";

interface Item {
  text: string;
  link: string;
}

type BreadcrumbsProps = {
  items: Item[];
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <div data-is-here-when="sm" className="s-breadcrumbs mb12">
      {items.map((item, index) => (
        <div key={index} className="s-breadcrumbs--item">
          {item.link ? (
            <Link href={item.link} passHref legacyBehavior>
              <a className="s-breadcrumbs--link">{item.text}</a>
            </Link>
          ) : (
            <span className="s-breadcrumbs--link">{item.text}</span>
          )}
          {index < items.length - 1 && (
            <svg
              aria-hidden="true"
              className="s-breadcrumbs--divider svg-icon iconArrowRightAltSm"
              width="13"
              height="14"
              viewBox="0 0 13 14"
            >
              <path d="m4.38 4.62 1.24-1.24L9.24 7l-3.62 3.62-1.24-1.24L6.76 7 4.38 4.62Z"></path>
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};
export default Breadcrumbs;
